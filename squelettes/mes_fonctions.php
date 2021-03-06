<?php
function recherche_avancee_google_like($string, $resume='')
{	// Convertir en texte brut sans accent
	$string = textebrut($string);
	$string = translitteration($string);
	$rech = translitteration($_GET['recherche']);
	// Supprimer les caracteres qui m...
	$badguy = array("^", "/", "\\", "$", "@", "*");
	$rech = str_replace($badguy,"",$rech);
	// en avant
	$query = rtrim(str_replace("+", " ", $rech));  
	$qt = explode(" ", $query);
	$num = count ($qt);
	// $cc = ceil(55 / $num);
	$cc=55;
	for ($i = 0; $i < $num; $i++) 
	{	//$tab[$i] = preg_split("/($qt[$i])/i",$string,2, PREG_SPLIT_DELIM_CAPTURE);
		$tab[$i] = preg_split("/\b($qt[$i])/i",$string,2, PREG_SPLIT_DELIM_CAPTURE);
		if(count($tab[$i])>1)
		{	// Chaine avant
			$avant = substr($tab[$i][0],-$cc,$cc);
			$mots = explode(" ",$avant,2);
			if (count($mots)>1) $avant = $mots[1];
			// Chaine apres
			$apres = substr($tab[$i][2],0,$cc);
			$apres = preg_replace('@(.+)\s\S+@s', '\1', $apres);
			// Concatener
			if ($string_re=='') $string_re = "<i class=rsusp>[...]</i>";
			$string_re .= " $avant<span class=spip_surligne>".$tab[$i][1]."</span>$apres <i class=rsusp>[...]</i> ";
		}
	}
	// Si rien trouve : renvoyer les premiers mots en resume
	if ($resume!='' && $string_re=='')
	{	$mots = explode(" ",$string,40);
		for ($i = 0; $i < count($mots)-1; $i++)
		{	$string_re .= $mots[$i]." ";
			if (strlen($string_re)>2*$cc) break;
		}
		$string_re .= "<i class=rsusp>[...]</i>";
	}
	return $string_re;
}

function image_reduire_recadre($img, $largeur, $hauteur, $position='center') {
       include_spip('inc/filtres_images');
       if ($img!='IMG/'){
            list ($ret["hauteur"],$ret["largeur"]) = taille_image($img);
            $ratio_x = $ret["largeur"]/$largeur;
            $ratio_y = $ret["hauteur"]/$hauteur;
            $ratio   = ($ratio_x <= $ratio_y) ? $ratio_x : $ratio_y;
            return image_recadre(image_reduire_par($img, $ratio), $largeur, $hauteur, $position);
            }
}

//filtre de redirection
function redirection($url){
header('Location:'.$url);
}

function redirection_langue($lang,$id_trad){
	$url=sql_getfetsel('url','spip_rubriques AS a, spip_urls AS b','b.id_objet=a.id_rubrique AND a.id_trad='.$id_trad.' AND b.type="rubrique" AND a.lang="'.$lang.'"');

	if($url){
		include_spip('inc/cookie');
		
		spip_setcookie('spip_lang', $_COOKIE['spip_lang'] = $lang, time() + 365 * 24 * 3600);

		header("Status: 301 Moved Permanently", false, 301);
		header("Location: $url");
		}	
	}

?>
