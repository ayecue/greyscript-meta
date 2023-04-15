import { getDescription, getExample } from './descriptions';
import AptClient from './signatures/apt-client.json';
import Blockchain from './signatures/blockchain.json';
import Coin from './signatures/coin.json';
import Computer from './signatures/computer.json';
import Crypto from './signatures/crypto.json';
import File from './signatures/file.json';
import FtpShell from './signatures/ftp-shell.json';
import Generic from './signatures/general.json';
import List from './signatures/list.json';
import ClassSignature from './signatures/class.json';
import MapSignature from './signatures/map.json';
import NumberSignature from './signatures/number.json';
import FunctionSignature from './signatures/function.json';
import MetaLib from './signatures/meta-lib.json';
import MetaMail from './signatures/meta-mail.json';
import Metaxploit from './signatures/metaxploit.json';
import NetSession from './signatures/net-session.json';
import Port from './signatures/port.json';
import Router from './signatures/router.json';
import Service from './signatures/service.json';
import Shell from './signatures/shell.json';
import String from './signatures/string.json';
import SubWallet from './signatures/sub-wallet.json';
import Wallet from './signatures/wallet.json';
import memoizee from 'memoizee';

export interface SignatureDefinitionArg {
  label: string;
  type: string;
  opt?: boolean;
  default?: string;
}

export interface SignatureDefinition {
  arguments?: SignatureDefinitionArg[];
  returns: string[];
  description?: string;
  example?: string[];
}

export type SignatureDefinitionContainer = {
  [key: string]: SignatureDefinition;
};

export interface Signature {
  type: string;
  definitions: SignatureDefinitionContainer;
}

const enrichContainer = memoizee((
  type: string,
  container: SignatureDefinitionContainer,
  language?: string
): SignatureDefinitionContainer => {
  return Object.entries(container).reduce(
    (result: SignatureDefinitionContainer, [name, def]) => ({
      ...result,
      [name]: {
        ...def,
        description: getDescription(type, name, language),
        example: getExample(type, name, language)
      }
    }),
    {}
  );
}, { length: false, primitive: true });

export const signatures: Signature[] = [
  {
    type: 'aptClient',
    definitions: <SignatureDefinitionContainer>(<unknown>AptClient)
  },
  {
    type: 'blockchain',
    definitions: <SignatureDefinitionContainer>(<unknown>Blockchain)
  },
  {
    type: 'class',
    definitions: <SignatureDefinitionContainer>(<unknown>ClassSignature)
  },
  {
    type: 'coin',
    definitions: <SignatureDefinitionContainer>(<unknown>Coin)
  },
  {
    type: 'computer',
    definitions: <SignatureDefinitionContainer>(<unknown>Computer)
  },
  {
    type: 'crypto',
    definitions: <SignatureDefinitionContainer>(<unknown>Crypto)
  },
  {
    type: 'file',
    definitions: <SignatureDefinitionContainer>(<unknown>File)
  },
  {
    type: 'ftpShell',
    definitions: <SignatureDefinitionContainer>(<unknown>FtpShell)
  },
  {
    type: 'function',
    definitions: <SignatureDefinitionContainer>(<unknown>FunctionSignature)
  },
  {
    type: 'general',
    definitions: <SignatureDefinitionContainer>(<unknown>Generic)
  },
  {
    type: 'list',
    definitions: <SignatureDefinitionContainer>(<unknown>List)
  },
  {
    type: 'map',
    definitions: <SignatureDefinitionContainer>(<unknown>MapSignature)
  },
  {
    type: 'metaLib',
    definitions: <SignatureDefinitionContainer>(<unknown>MetaLib)
  },
  {
    type: 'metaMail',
    definitions: <SignatureDefinitionContainer>(<unknown>MetaMail)
  },
  {
    type: 'metaxploit',
    definitions: <SignatureDefinitionContainer>(<unknown>Metaxploit)
  },
  {
    type: 'netSession',
    definitions: <SignatureDefinitionContainer>(<unknown>NetSession)
  },
  {
    type: 'number',
    definitions: <SignatureDefinitionContainer>(<unknown>NumberSignature)
  },
  {
    type: 'port',
    definitions: <SignatureDefinitionContainer>(<unknown>Port)
  },
  {
    type: 'router',
    definitions: <SignatureDefinitionContainer>(<unknown>Router)
  },
  {
    type: 'service',
    definitions: <SignatureDefinitionContainer>(<unknown>Service)
  },
  {
    type: 'shell',
    definitions: <SignatureDefinitionContainer>(<unknown>Shell)
  },
  {
    type: 'string',
    definitions: <SignatureDefinitionContainer>(<unknown>String)
  },
  {
    type: 'subWallet',
    definitions: <SignatureDefinitionContainer>(<unknown>SubWallet)
  },
  {
    type: 'wallet',
    definitions: <SignatureDefinitionContainer>(<unknown>Wallet)
  }
];

export const allTypes: string[] = signatures.map((item) => item.type);
export const signaturesByType: { [key: string]: SignatureDefinitionContainer } =
  signatures.reduce((result, item) => {
    Object.assign(result, {
      [item.type]: item.definitions
    });
    return result;
  }, {});

export const getDefinitions = (
  types: string[],
  language?: string
): SignatureDefinitionContainer => {
  if (types.includes('any')) {
    return getDefinitions(allTypes, language);
  }
  return types
    .map((type) => {
      const [main] = type.split(':');
      return enrichContainer(main, signaturesByType[main] || {}, language);
    })
    .reduce((result, definitions) => {
      Object.assign(result, definitions);
      return result;
    }, {});
};

export const getDefinition = (
  types: string[],
  property: string,
  language?: string
): SignatureDefinition | null => {
  const definitions = getDefinitions(types, language);
  return definitions[property] || null;
};

export const isNative = (types: string[], property: string): boolean => {
  return !!getDefinition(types, property);
};
