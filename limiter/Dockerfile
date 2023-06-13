FROM golang:alpine as prod
RUN mkdir /app
ADD ./src /app/
WORKDIR /app
RUN CGO_ENABLED=0 GOOS=linux go build -a -installsuffix cgo -o main .
CMD ["/app/main"]
EXPOSE 8080
