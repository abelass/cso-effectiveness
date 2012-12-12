<?php
$GLOBALS['table_des_traitements']['TITRE'][]= 'typo(supprimer_numero(%s), "TYPO", $connect)';
$GLOBALS['table_des_traitements']['NOM'][]= 'typo(supprimer_numero(%s), "TYPO", $connect)';
$GLOBALS['toujours_paragrapher']=false;
$GLOBALS['forcer_lang']=true;
$GLOBALS['derniere_modif_invalide']=true;
if (!defined('_DUREE_CACHE_DEFAUT')) define('_DUREE_CACHE_DEFAUT',86400);
if (!defined('_DELAI_CACHE_resultats')) define('_DELAI_CACHE_resultats',600);
$GLOBALS['quota_cache']=10;
if (!defined('_LOGIN_TROP_COURT')) define('_LOGIN_TROP_COURT',4);
if (!defined('_TRANCHES')) define('_TRANCHES',10);

define ('_ID_WEBMESTRES' ,'1:2');


// Pipeline

$GLOBALS['spip_pipeline']['declarer_tables_principales'] .= "|declarer_tables_principales";

function declarer_tables_principales($tables_principales){
        // Extension de la signatures
        $tables_principales['spip_signatures']['field']['type_organisation'] = "VARCHAR(10)  DEFAULT '' NOT NULL";   
	$tables_principales['spip_signatures']['field']['nom_contact'] = "TEXT DEFAULT '' NOT NULL";          
        return $tables_principales;
}

?>