import Prism from 'prismjs';

export const GreyScriptLanguage = {
  constants: /\b(params|locals|globals)\b/,
  self: /\b(self)\b/,
  super: /\b(super)\b/,
  type: /\b(number|string|null|any|list|map)\b/,
  class:
    /\b(aptClient|computer|crypto|file|ftpShell|metaLib|metaMail|metaxploit|netSession|port|router|shell|blockchain|service|subWallet|wallet|coin|ctfEvent)\b/,
  method: [
    {
      pattern: /\.(get_description|get_template|player_success|get_creator_name|get_mail_content)\b/
    },
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
        /\b(mail_login|parent_path|trim|hasIndex|typeof|get_router|get_switch|nslookup|print|clear_screen|active_user|home_dir|get_shell|indexes|values|indexOf|len|shuffle|val|lower|upper|sum|pop|pull|push|sort|remove|user_input|include_lib|import_code|exit|user_mail_address|user_bank_number|whois|wait|command_info|program_path|current_path|format_columns|current_date|is_lan_ip|is_valid_ip|bitwise|abs|acos|asin|atan|tan|cos|code|char|sin|floor|range|round|rnd|sign|sqrt|str|ceil|pi|launch|launch_path|slice|md5|hash|time|bitAnd|bitOr|bitXor|log|yield|get_custom_object|insert|to_int|join|split|reverse|replace|replace_regex|is_match|lastIndexOf|matches|get_ctf|check_upgrade|show|search|update|add_repo|del_repo|install|coin_price|show_history|amount_mined|get_coin|login_wallet|create_wallet|delete_coin|set_cycle_mining|get_cycle_mining|get_reward|set_reward|transaction|create_subwallet|get_subwallet|get_subwallets|set_address|get_address|get_mined_coins|get_ports|get_name|lan_ip|public_ip_pc|File|create_folder|is_network_active|touch|show_procs|network_devices|change_password|create_user|delete_user|create_group|delete_group|groups|close_program|wifi_networks|connect_wifi|connect_ethernet|network_gateway|active_net_card|aircrack|airmon|aireplay|decipher|smtp_user_list|get_description|get_template|player_success|get_creator_name|get_mail_content|chmod|copy|move|rename|path|is_folder|parent|name|allow_import|get_content|set_content|is_binary|has_permission|delete|get_folders|get_files|permissions|owner|set_owner|group|set_group|size|load|net_use|rshell_client|rshell_server|scan|scan_address|sniffer|overflow|version|lib_name|dump_lib|get_num_conn_gateway|get_num_portforward|get_num_users|is_any_active_user|is_root_active_user|device_ports|devices_lan_ip|bssid_name|essid_name|firewall_rules|kernel_version|local_ip|public_ip|used_ports|ping_port|port_info|install_service|start_service|stop_service|host_computer|start_terminal|build|connect_service|ping|scp|get_balance_subwallet|set_info|get_info|delete_subwallet|get_user|last_transaction|mining|check_password|wallet_username|list_coins|get_balance|buy_coin|sell_coin|get_pending_trade|cancel_pending_trade|get_global_offers|list_global_coins|show_nodes|reset_password|get_pin|delete_mail|fetch|read|send|port_number|is_closed|get_lan_ip)\b/
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
