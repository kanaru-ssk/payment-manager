FROM golang:1.23 AS build

WORKDIR /go/src

COPY go.mod go.sum .
RUN go mod download

COPY . .
RUN CGO_ENABLED=0 go build -o /app cmd/grpc-server/main.go

FROM gcr.io/distroless/static:nonroot
COPY --from=build /app /app
ENTRYPOINT ["/app"]
