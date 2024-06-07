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

VariationRegistry.add('BlockchainSystem.Transaction', [
  "Error: coin does not exist",
  "Error: ${subWalletOrig} not found",
  "Error: ${subWalletDest} not found",
  "Error: wallet ${subWalletOrig} does not exist",
  "Error: target wallet does not exist",
  "${subWalletOrig} need to be registered in ${coinName} to be able to receive this coin.",
  "Error: subwallet ${subWalletDest} does not have coins in the selected currency",
  "Error: insufficient funds to complete the transaction"
]);

VariationRegistry.add('BlockchainSystem.SetAddress', [
  "Error: ${coinName} does not exist"
]);

VariationRegistry.add('BlockchainSystem.GetAddress', [
  "Error: ${coinName} does not exist"
]);

VariationRegistry.add('BlockchainSystem.ResetCoinPass', [
  "Error: coin does not exist",
  "Error: Only the account owner can change the password"
]);

// gets called by PreCrearCarpeta
VariationRegistry.add('PlayerUtils.CrearCarpeta', [
  "Unknown error.",
  "Error: empty destination path",
  "Error: only alphanumeric allowed as folder name.",
  "Error: name cannot exceed the limit of 128 characters.",
  "permission denied",
  "${filename} file exists",
  "Can't create folder. Reached maximum limit",
  "The copy can not be made. Reached maximum number of files in a folder",
  "The maximum number of subfolders has been exceeded"
]);

// gets called by CrearArchivoSyncClients
VariationRegistry.add('PlayerUtils.CrearArchivo', [
  "Can't create file. Unknown error",
  "Can't create file. Reached maximum limit",
  "Invalid path",
  "Can't create file ${pathFolderDest}/${filename}. Permission denied",
  "There is not enough free space on the hard disk.",
  "The copy can not be made. Reached maximum number of files in a folder",
]);

VariationRegistry.add('Computer.ValidateNewUser', [
  "Error: root user already exists.",
  "Error: can't create guest user. Reserved user.",
  "Error: can't create user. ${username} already exists."
]);

// gets called by EnableEthernetCard
VariationRegistry.add('NetworkLan.ConnectEthernet', [
  "Error: Ethernet card not connected to the network",
  "Unable to find ISP network to connect using Ethernet card",
  "can't connect: the home network has been temporarily disabled due to non-payment",
  "Error: the gateway cannot be the same device to connect",
  "Error: gateway ${gateway} does not exist in the network",
  "Error: address ${address} is already in use.",
  "Unknown error: The current IP ${localIp} does not exist in this network",
  "Error: unable to run command on routers/switches"
]);

VariationRegistry.add('PlayerUtils.GetSmtpServer', [
  "invalid IP address",
  "host is down",
  "host doesn't exist",
  "ip address not found",
  "port ${port} not found",
  "host doesn't exist",
  "invalid target service",
  "service not found"
]);

VariationRegistry.add('FileSystem.UpdatePermisos', [
  "permission denied",
  "permission denied. File protected.",
  "Wrong format."
]);

// gets called by CheckMoveFile
VariationRegistry.add('PlayerUtils.MoverFichero', [
  "Unknown error",
  "Error: Invalid path",
  "${sourceFilepath} not found",
  "${destinationParentPath} not found",
  "permission denied",
  "There is not enough free space on the hard disk.",
  "permission denied. ${filename} is protected.",
  "A file cannot overwrite a folder or vice versa",
  "The copy can not be made. Reached maximum number of files in a folder",
  "The copy can not be made. Reached maximum limit"
]);

// gets called by PreRemoveFile
VariationRegistry.add('PlayerUtils.RemoveFile', [
  "file not found: ${path}",
  "permission denied",
  "permission denied. File protected.",
  "unknown error :/"
]);

// gets called by PlayerUtils.SendMail
VariationRegistry.add('Database.GetMailAccount', [
  "Unable to login into account. Wrong password.",
  "${user} user not found",
  "Unknown error: This email account cannot be obtained.",
  "Unable to login into account. Wrong password."
]);

VariationRegistry.add('PlayerUtils.SendMail', [
  "Invalid email address",
  "Mail subject too large",
  "Mail message too large",
  "Unknown error: attachment failed",
  "Error: attachment not found",
  "Unable to attach file: permission denied",
  "The email couldn't be sent. The recipient has blocked this email address.",
  "The email couldn't be sent. The recipient has blocked emails sent by other players.",
  "The email couldn't be sent. The recipient has blocked emails sent by other players using npcs accounts."
]);