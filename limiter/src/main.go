package main

import (
	"log"
	"net/http"
	"net/http/httputil"
	"net/url"
	"os"

	"github.com/didip/tollbooth"
)

func main() {
	remote, err := url.Parse(os.Getenv("PROXY_URL"))
	if err != nil {
		panic(err)
	}

	// Rate limiter: Allow one vote per second.
	// Suggestion: Try reducing this to 0.1 to allow one vote every 10 seconds.
	// When using garden deploy --sync, the code change will be automatically synchronized
	// See also https://docs.garden.io/guides/code-synchronization
	limiter := tollbooth.NewLimiter(1, nil)
	limiter.SetMessage("Please slow down.")
	limiter.SetOnLimitReached(func(w http.ResponseWriter, r *http.Request) {
		log.Printf("%s: Limiting: Too many requests", r.URL)
	})

	// Reverse proxy
	handler := func(p *httputil.ReverseProxy) func(http.ResponseWriter, *http.Request) {
		log.Println("Hello world!")

		return func(w http.ResponseWriter, r *http.Request) {
			log.Printf("%s: OK: Forwarding", r.URL)
			r.Host = remote.Host
			p.ServeHTTP(w, r)
		}
	}

	proxy := httputil.NewSingleHostReverseProxy(remote)
	http.Handle("/", tollbooth.LimitFuncHandler(limiter, handler(proxy)))
	err = http.ListenAndServe(":8080", nil)
	if err != nil {
		panic(err)
	}
}
