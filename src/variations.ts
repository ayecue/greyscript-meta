import { VariationRegistry } from 'meta-utils';

VariationRegistry.add('GreyInterpreter.CheckScpUpload', [
  'unknown error',
  'Invalid path',
  '${filepath} not found',
  'permission denied',
  'permission denied. ${filename} is protected',
  'The copy can not be made. Reached maximum number of files in a folder',
  'The copy can not be made. Reached maximum limit'
]);

// calls PlayerUtils.FirewallPingStatus
// calls Computer.CheckInicio
VariationRegistry.add('PlayerUtils.ConnectComputer', [
  'ip address not found',
  "can't connect: the remote server has been temporarily disabled due to non-payment",
  "can't connect: port ${port} not found",
  "can't connect: port closed",
  "can't connect: There is no active machine behind the port ${port}",
  "can't connect: service not found behind the port ${port}"
]);

// gets called by PlayerUtils.PreRenameFichero
VariationRegistry.add('PlayerUtils.RenameFichero', [
  'Unknown error',
  '${filepath} not found',
  'Error: name cannot exceed the limit of 128 characters.',
  'permission denied',
  'permission denied. File protected',
  'There is already a file with that name, please choose another one.'
]);

VariationRegistry.add('PlayerUtils.FirewallPingStatus', [
  'Connection refused. Address unreachable',
  'Connection refused. The target is behind a firewall.'
]);

VariationRegistry.add('Computer.CheckInicio', [
  'Fatal error: ${filepath} corrupted!',
  'Kernel panic: missing ${filepath} file!',
  'Graphics error: ${filepath} not found!',
  'Fatal error:  ${filepath} not found!'
]);

// calls Networking.IsRouterAvailable
VariationRegistry.add('Networking.CheckServiceOnline', [
  'No internet access.',
  'Remote host is down',
  'Unable to find service ${service}',
  'Invalid target service port configuration.',
  'connection rejected: port forward removed by admin',
  'Unable to connect: missing ${library}',
  'Unable to connect: invalid ${library}',
  'Unexpected library found. Not a valid ${library} library.',
  'Unknown error'
]);

VariationRegistry.add('Networking.IsRouterAvailable', [
  "can't connect: invalid or missing kernel_router.so in the target router",
  "can't connect: unexpected library found. Not a valid kernel_router.so library in the target router.",
  "can't connect: invalid or missing kernel_router.so in the target router"
]);

VariationRegistry.add('BlockchainSystem.AddWallet', [
  "Error: Wallet user already exists.",
  "Error: Only one wallet per player allowed."
]);

VariationRegistry.add('BlockchainSystem.RemoveCurrency', [
  "Error: ${coinname} does not exist",
  "Error: incorrect user/password"
]);

VariationRegistry.add('BlockchainSystem.AddSubWallet', [
  "Error: Wallet does not exists.",
  "Error: Coin does not exist.",
  "Error: This username already exists",
  "Error: Incorrect PIN",
  "Error: only a maximum of 10 subwallets per coin is allowed."
]);