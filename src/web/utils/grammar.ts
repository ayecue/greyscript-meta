import Prism from 'prismjs';

export const GreyScriptLanguage = {
  constants: /\b(params|locals|globals)\b/,
  self: /\b(self)\b/,
  super: /\b(super)\b/,
  type: /\b(number|string|null|any|list|map)\b/,
  class:
    /\b(aptClient|computer|crypto|file|ftpShell|metaLib|metaMail|metaxploit|netSession|port|router|shell|blockchain|service|subWallet|wallet|coin)\b/,
  method: [
    {
      pattern:
        /\.(show|search|update|add_repo|del_repo|install|check_upgrade)\b/
    },
    {
      pattern:
        /\.(get_ports|File|create_folder|is_network_active|touch|show_procs|network_devices|change_password|create_user|delete_user|create_group|delete_group|groups|close_program|wifi_networks|connect_wifi|connect_ethernet|network_gateway|active_net_card)\b/
    },
    {
      pattern: /\.(aircrack|airmon|aireplay|decipher|smtp_user_List)\b/
    },
    {
      pattern:
        /\.(chmod|copy|move|rename|path|parent|name|get_content|set_content|is_binary|has_permission|delete|get_folders|get_files|permissions|owner|set_owner|group|set_group|size|meta_info)\b/
    },
    {
      pattern: /\.(host_computer|start_terminal|put)\b/
    },
    {
      pattern:
        /\.(remove|push|pop|pull|shuffle|reverse|sum|hasIndex|indexOf|sort|join|indexes|len|values)\b/
    },
    {
      pattern:
        /\.(remove|push|pop|pull|shuffle|sum|sum|hasIndex|indexOf|indexes|len|values)\b/
    },
    {
      pattern: /\.(overflow|version|lib_name)\b/
    },
    {
      pattern: /\.(delete|fetch|read|send)\b/
    },
    {
      pattern:
        /\.(load|net_use|rshell_client|rshell_server|scan|scan_address|sniffer)\b/
    },
    {
      pattern: /\.(dump_lib)\b/
    },
    {
      pattern: /\.(port_number|is_closed|get_lan_ip)\b/
    },
    {
      pattern:
        /\.(device_ports|devices_lan_ip|bssid_name|essid_name|firewall_rules|kernel_version|local_ip|public_ip|used_ports|ping_port|port_info)\b/
    },
    {
      pattern:
        /\.(host_computer|start_terminal|build|connect_service|launch|ping|scp|masterkey|masterkey_direct|restore_network)\b/
    },
    {
      pattern:
        /\.(remove|hasIndex|indexOf|lastIndexOf|split|replace|trim|indexes|code|len|lower|upper|val|values|to_int|is_match|matches)\b/
    },
    {
      pattern:
        /\.(coin_price|show_history|amount_mined|get_coin|login_wallet|create_wallet|delete_coin)\b/
    },
    {
      pattern: /\.(install_service|start_service|stop_service)\b/
    },
    {
      pattern:
        /\.(set_cycle_mining|get_cycle_mining|get_reward|set_reward|transaction|create_subwallet|get_subwallet|get_subwallets|set_address|get_address|get_mined_coins)\b/
    },
    {
      pattern:
        /\.(list_coins|get_balance|buy_coin|sell_coin|get_pending_trade|cancel_pending_trade|get_global_offers|list_global_coins|show_nodes|reset_password|get_pin)\b/
    },
    {
      pattern:
        /\.(get_balance|set_info|get_info|delete|get_user|last_transaction|mining|check_password|wallet_username)\b/
    },
    {
      pattern:
        /\b(mail_login|typeof|get_router|get_switch|nslookup|print|clear_screen|active_user|home_dir|get_shell|user_input|include_lib|import_code|exit|user_mail_address|user_bank_number|whois|wait|command_info|program_path|current_path|format_columns|current_date|is_lan_ip|is_valid_ip|bitwise|abs|acos|asin|atan|tan|cos|char|sin|floor|range|round|rnd|sign|sqrt|str|ceil|pi|launch_path|slice|md5|hash|time|replace_regex|is_match|matches)\b/
    }
  ],
  keyword: [
    {
      pattern:
        /\b(if|then|return|end|else|function|and|or|in|not|continue|break|while|for|new|from|isa)\b/
    },
    {
      pattern: /\b#(include|import|envar)\b/
    }
  ],
  function: /function(?=\()/,
  comment: [
    {
      pattern: /(^|[^\:])\/\/.*/,
      lookbehind: true,
      greedy: true
    }
  ],
  boolean: /\b(?:false|true)\b/,
  number: {
    pattern: /\d+(\.\d+)?([eE]-?\d*)?/,
    lookbehind: true
  },
  string: {
    pattern: /"([^"]*?("")?)"/,
    greedy: true
  },
  operator: /([+\-*\/\^\&|]|[\<\>\=\!+*\-\/]?\=|\<\<|\>\>\>?)/,
  punctuation: /[\{\}\[\]\(\)]/
} as Prism.Grammar;
