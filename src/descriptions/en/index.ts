import { DescriptionsPayload } from 'meta-utils';

import Any from './any.json';
import AptClient from './apt-client.json';
import Blockchain from './blockchain.json';
import ClassLanguage from './class.json';
import Coin from './coin.json';
import Computer from './computer.json';
import Crypto from './crypto.json';
import CTFEvent from './ctf-event.json';
import File from './file.json';
import FtpComputer from './ftp-computer.json';
import FtpFile from './ftp-file.json';
import FtpShell from './ftp-shell.json';
import FunctionLanguage from './function.json';
import Generic from './general.json';
import List from './list.json';
import MapLanguage from './map.json';
import MetaLib from './meta-lib.json';
import MetaMail from './meta-mail.json';
import Metaxploit from './metaxploit.json';
import NetSession from './net-session.json';
import Number from './number.json';
import Port from './port.json';
import Router from './router.json';
import Service from './service.json';
import Shell from './shell.json';
import String from './string.json';
import SubWallet from './sub-wallet.json';
import Wallet from './wallet.json';
import DebugLibrary from './debug-library.json';
import TrafficNet from './traffic-net.json';
import SmartAppliance from './smart-appliance.json';

const descriptions: DescriptionsPayload = {
  any: Any,
  aptClient: AptClient,
  blockchain: Blockchain,
  class: ClassLanguage,
  ctfEvent: CTFEvent,
  coin: Coin,
  computer: Computer,
  crypto: Crypto,
  function: FunctionLanguage,
  file: File,
  ftpComputer: FtpComputer,
  ftpFile: FtpFile,
  ftpShell: FtpShell,
  general: Generic,
  list: List,
  map: MapLanguage,
  metaLib: MetaLib,
  metaMail: MetaMail,
  metaxploit: Metaxploit,
  netSession: NetSession,
  port: Port,
  router: Router,
  service: Service,
  shell: Shell,
  string: String,
  subWallet: SubWallet,
  wallet: Wallet,
  number: Number,
  debugLibrary: DebugLibrary,
  trafficNet: TrafficNet,
  smartAppliance: SmartAppliance
};

export default descriptions;
