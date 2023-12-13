import { Collection } from 'meta-utils';

import EN from './descriptions/en/index';
import enSite from './descriptions/en/site.json';
import Any from './signatures/any.json';
import AptClient from './signatures/apt-client.json';
import Blockchain from './signatures/blockchain.json';
import ClassSignature from './signatures/class.json';
import CTFEvent from './signatures/ctfEvent.json';
import Coin from './signatures/coin.json';
import Computer from './signatures/computer.json';
import Crypto from './signatures/crypto.json';
import File from './signatures/file.json';
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

export const greyscriptMeta = new Collection();

greyscriptMeta.addSignature('any', Any);
greyscriptMeta.addSignature('aptClient', AptClient, {
  inerhitsFrom: ['map']
});
greyscriptMeta.addSignature('blockchain', Blockchain, {
  inerhitsFrom: ['map']
});
greyscriptMeta.addSignature('ctfEvent', CTFEvent, {
  inerhitsFrom: ['map']
});
greyscriptMeta.addSignature('class', ClassSignature, {
  isInternalType: true
});
greyscriptMeta.addSignature('coin', Coin, {
  inerhitsFrom: ['map']
});
greyscriptMeta.addSignature('computer', Computer, {
  inerhitsFrom: ['map']
});
greyscriptMeta.addSignature('crypto', Crypto, {
  inerhitsFrom: ['map']
});
greyscriptMeta.addSignature('file', File, {
  inerhitsFrom: ['map']
});
greyscriptMeta.addSignature('ftpShell', FtpShell, {
  inerhitsFrom: ['map']
});
greyscriptMeta.addSignature('function', FunctionSignature, {
  isInternalType: true
});
greyscriptMeta.addSignature('general', Generic, {
  isInternalType: true
});
greyscriptMeta.addSignature('list', List);
greyscriptMeta.addSignature('map', MapSignature);
greyscriptMeta.addSignature('metaLib', MetaLib, {
  inerhitsFrom: ['map']
});
greyscriptMeta.addSignature('metaMail', MetaMail, {
  inerhitsFrom: ['map']
});
greyscriptMeta.addSignature('metaxploit', Metaxploit, {
  inerhitsFrom: ['map']
});
greyscriptMeta.addSignature('netSession', NetSession, {
  inerhitsFrom: ['map']
});
greyscriptMeta.addSignature('number', NumberSignature, {
  isInternalType: true
});
greyscriptMeta.addSignature('port', Port, {
  inerhitsFrom: ['map']
});
greyscriptMeta.addSignature('router', Router, {
  inerhitsFrom: ['map']
});
greyscriptMeta.addSignature('service', Service, {
  inerhitsFrom: ['map']
});
greyscriptMeta.addSignature('shell', Shell, {
  inerhitsFrom: ['map']
});
greyscriptMeta.addSignature('string', String);
greyscriptMeta.addSignature('subWallet', SubWallet, {
  inerhitsFrom: ['map']
});
greyscriptMeta.addSignature('wallet', Wallet, {
  inerhitsFrom: ['map']
});

greyscriptMeta.addMeta('en', EN);

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
