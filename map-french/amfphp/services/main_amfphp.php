<?php

include_once dirname(__FILE__)."/../../config/setup.php";
include_once dirname(__FILE__)."/../../web/php/mail/sendContactEmail.php";
require(dirname(__FILE__)."/../../web/php/phpMailer/class.phpmailer.php");

 class Main_amfphp {
	
	
	function sendMail($arg){


		$arg_decoded = json_decode($arg);



		$se_email_class = new SendContactEmail();


		if($se_email_class->send($arg_decoded)){

				return json_encode($arg_decoded);

		}else{


		}




	}
	
	
 }
?>