import './variations';

import { Container } from 'meta-utils';

import EN from './descriptions/en/index';
import enSite from './descriptions/en/site.json';
import Any from './signatures/any.json';
import AptClient from './signatures/apt-client.json';
import Blockchain from './signatures/blockchain.json';
import ClassSignature from './signatures/class.json';
import Coin from './signatures/coin.json';
import Computer from './signatures/computer.json';
import Crypto from './signatures/crypto.json';
import CTFEvent from './signatures/ctf-event.json';
import File from './signatures/file.json';
import FtpComputer from './signatures/ftp-computer.json';
import FtpFile from './signatures/ftp-file.json';
import FtpShell from './signatures/ftp-shell.json';
import FunctionSignature from './signatures/function.json';
import Generic from './signatures/general.json';
import List from './signatures/list.json';
import MapSignature from './signatures/map.json';
import MetaLib from './signatures/meta-lib.json';
import MetaMail from './signatures/meta-mail.json';
import Metaxploit from './signatures/metaxploit.json';
import NetSession from './signatures/net-session.json';
import NumberSignature from './signatures/number.json';
import Port from './signatures/port.json';
import Router from './signatures/router.json';
import Service from './signatures/service.json';
import Shell from './signatures/shell.json';
import String from './signatures/string.json';
import SubWallet from './signatures/sub-wallet.json';
import Wallet from './signatures/wallet.json';
import DebugLibrary from './signatures/debug-library.json';
import TrafficNet from './signatures/traffic-net.json';
import SmartAppliance from './signatures/smart-appliance.json';

export const greyscriptMeta = new Container();

greyscriptMeta.addTypeSignatureFromPayload(Any);
greyscriptMeta.addTypeSignatureFromPayload(AptClient);
greyscriptMeta.addTypeSignatureFromPayload(Blockchain);
greyscriptMeta.addTypeSignatureFromPayload(CTFEvent);
greyscriptMeta.addTypeSignatureFromPayload(ClassSignature);
greyscriptMeta.addTypeSignatureFromPayload(Coin);
greyscriptMeta.addTypeSignatureFromPayload(Computer);
greyscriptMeta.addTypeSignatureFromPayload(Crypto);
greyscriptMeta.addTypeSignatureFromPayload(File);
greyscriptMeta.addTypeSignatureFromPayload(FtpComputer);
greyscriptMeta.addTypeSignatureFromPayload(FtpFile);
greyscriptMeta.addTypeSignatureFromPayload(FtpShell);
greyscriptMeta.addTypeSignatureFromPayload(FunctionSignature);
greyscriptMeta.addTypeSignatureFromPayload(Generic);
greyscriptMeta.addTypeSignatureFromPayload(List);
greyscriptMeta.addTypeSignatureFromPayload(MapSignature);
greyscriptMeta.addTypeSignatureFromPayload(MetaLib);
greyscriptMeta.addTypeSignatureFromPayload(MetaMail);
greyscriptMeta.addTypeSignatureFromPayload(Metaxploit);
greyscriptMeta.addTypeSignatureFromPayload(NetSession);
greyscriptMeta.addTypeSignatureFromPayload(NumberSignature);
greyscriptMeta.addTypeSignatureFromPayload(Port);
greyscriptMeta.addTypeSignatureFromPayload(Router);
greyscriptMeta.addTypeSignatureFromPayload(Service);
greyscriptMeta.addTypeSignatureFromPayload(Shell);
greyscriptMeta.addTypeSignatureFromPayload(String);
greyscriptMeta.addTypeSignatureFromPayload(SubWallet);
greyscriptMeta.addTypeSignatureFromPayload(Wallet);
greyscriptMeta.addTypeSignatureFromPayload(DebugLibrary);
greyscriptMeta.addTypeSignatureFromPayload(TrafficNet);
greyscriptMeta.addTypeSignatureFromPayload(SmartAppliance);

greyscriptMeta.addMetaFromPayload('en', EN);

export const isNative = (types: string[], property: string): boolean => {
  return !!greyscriptMeta.getDefinition(types, property);
};

export const getSiteLanguageFile = (
  language: string = 'en'
): Record<string, string> => {
  switch (language) {
    case 'en':
      return enSite;
    default:
      throw new Error(`Language "${language}" is unknown.`);
  }
};

export const getSiteDescription = (tag: string, language?: string): string => {
  const lang = getSiteLanguageFile(language);
  return lang?.[tag];
};
