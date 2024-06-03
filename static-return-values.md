## GreyInterpreter
### CheckScpUpload
```
"unknown error",
"Invalid path",
"${filepath} not found",
"permission denied",
"permission denied. ${filename} is protected",
"The copy can not be made. Reached maximum number of files in a folder",
"The copy can not be made. Reached maximum limit",
```

## PlayerUtils
### Connect computer:
```
"ip address not found",
"can't connect: the remote server has been temporarily disabled due to non-payment",
"can't connect: port ${port} not found",
"can't connect: port closed",
"can't connect: There is no active machine behind the port ${port}",
"can't connect: service not found behind the port ${port}"
```

Includes messages from:
```
PlayerUtils.FirewallPingStatus
Computer.CheckInicio
```

### FirewallPingStatus
```
"Connection refused. Address unreachable",
"Connection refused. The target is behind a firewall.",
```

## Computer
### CheckInicio
```
"Fatal error: ${filepath} corrupted!",
"Kernel panic: missing ${filepath} file!",
"Graphics error: ${filepath} not found!",
"Fatal error:  ${filepath} not found!",
```

## Netorking
### CheckServiceOnline
```
"No internet access.",
"Remote host is down",
"Unable to find service ${service}",
"Invalid target service port configuration.",
"connection rejected: port forward removed by admin",
"Unable to connect: missing ${library}",
"Unable to connect: invalid ${library}",
"Unexpected library found. Not a valid ${library} library.",
"Unknown error",
```

Includes messages from:
```
Netorking.IsRouterAvailable
```

### IsRouterAvailable
```
"can't connect: invalid or missing kernel_router.so in the target router",
"can't connect: unexpected library found. Not a valid kernel_router.so library in the target router.",
"can't connect: invalid or missing kernel_router.so in the target router",
```