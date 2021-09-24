<?php

$targetFolder = $_SERVER['DOCUMENT_ROOT'] . '/storage/app/public';
$linkFolder = $_SERVER['DOCUMENT_ROOT'] . '/public/storage';
symlink($targetFolder, $linkFolder);
echo 'Symlink process successfully completed';

// ln -s /path/to/laravel/storage/app/public /path/to/public/storage


// <IfModule mod_rewrite.c>
//     RewriteEngine On
//     RewriteRule ^(.*)$ public/$1 [L]
// </IfModule>

https://api.instagram.com/oauth/authorize
  ?client_id= 318880686438032
  &redirect_uri=https://www.google.com/?success=yeah
  &scope=user_profile,user_media
  &response_type=code

  https://api.instagram.com/oauth/authorize
  ?client_id= 318880686438032
  &redirect_uri=https://www.google.com/?success=yeah
  &scope=user_profile,user_media
  &response_type=code




https://www.google.com/?code=AQA9VWkzniQ6agmOMaYvro0bny7V8KV8CbgFpxCOUX64R-rB97DIJ1FlkBNouyE2DEHuZKRUSmO5ASLKKJyGrpqRFwOjgx8jloTsx3ncIrqLlMnelDW9VgWIvcTXjXlxQcsV0O9iLFMz_td0W-BpEbWR_NKwVKT4MtiJbnqVssYbLhukwaEuVAHu5fe396PEW3FzKaLf9MuK3nbUtA8_VLP0M79KRY7BT3Yvcr7nG7aCiQ#_

  curl -X POST \
  https://api.instagram.com/oauth/access_token \
  -F client_id=318880686438032 \
  -F client_secret=d12151fcbdba72b894cb547b8fb7e254 \
  -F grant_type=authorization_code \
  -F redirect_uri=https://www.google.com/?success=yeah \
  -F code=AQB2Ru8b39rMzDpRmWUp8-JEEvxtl5idcPP9zFWU1-080va0C_3lfzq1zy9tX5xnD5VkETj4YQdYPJL8osgLsnOav1ivZNXGT1EeFjH4RQuNtM2232HrZVuC724_KWkrYfbJ_LV_RXaUppgMX6Erz_RHB95hCqzBTM0CQjuc2rTppd2I0QWUZZDNmI-bAKlMv5IiSEK2gNVMHpCBOfnXfN3L9V_X5Vj-9wgXRpfcxYNrUA