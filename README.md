# Serverless Transceiver
A plugin to support better inter-service communication.

## Why?
In a microservices architecture, different services need to communicate with eachother. These messages might be async events or remote procedure calls. The messages and responses used during this communication need a stable format to allow the sender and receiver to process them.

The goal of this plugin is to help formalise the contracts for inter-service communication in Serverless projects. Defining contracts for function events will have the following benefits:

- Event validation (for sender and receiver)
- Standard error handling
- Documentation generation for internal services
- SDK generation for internal services

We also want to investigate whether we can tighten function invocation permissions by introduction a `internal` or `private` concept to functions. This will determine whether a function from another service is allowed to invoke this function.

## Contracts
Contracts formalise the format of messages sent between services. There are two types of contracts of interest, the message contact and data contract.

### Message Contracts
A message contract defines the structure of function events and results.

Message contracts will be managed by an SDK. The contracts will be versioned so the format can be changed at a later date.

I am proposing the following structures for message contracts.

#### Event
```json
{
  "version": "1",
  "data": {
    ...
  }
}
```

#### Success Result
```json
{
  “version”: “1”,
  “result”: {
    “type”: “success”,
    “data”: {
      ...
    }
  }
}
```


#### Validation Result
```json
{
  “version”: “1”,
  “result”: {
    “type”: “validation”,
    “validation”: {
      “messages”: [{
        “message”: “General validation”
      }, {
        “key”: “name”,
        “message”: “Name is required”
      }]
    }
  }
}
```

#### Exception Result
```json
{
  “version”: “1”,
  “result”: {
    “type”: “exception”,
    “exception”: {
      “message”: “Object is not an instance of an Object.”
    }
  }
}
```


### Data Contracts
A data contracts defines format of the event and result of a function. This will take the form of a JSON schema.

## SDKs

### Client
- Invoke remote services
- Validate events before invocation
- Handle errors in a standard way

### Function
- Validate received events
- Method for returning standard responses

## Serverless Plugin

### Define Data contracts
Users should be able to define data contracts for functions the `serverless.yml` of a service.

```yaml
service: my-service
functions:
  my_function:
    handler: src/something.handler
    contract:
      schema: 
        event: # JSON schema of function input
          type: object
          title: UserUpdateEvent
          properties:
            name:
              type: string
            age:
              type: integer
              minimum: 0
          required:
            - name
        result: # JSON schema of success result
          type: object
          title: UserUpdateResult
          properties:
            name:
              type: string
            age:
              type: integer
              minimum: 0
          required:
            - name

  my_other_function:
    handle: src/other.handler
    contract: ${file(./contracts/my_other_function.yml)}
```

### Documentation Generation
Automatically generate docs of callable functions and their contract.

### SDK Generation
Automatically create an SDK for clients to use with this service
