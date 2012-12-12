<?php 



 class SendContactEmail {
	
	
	
	function send($data){
		

			
				
			
			$logo = "../../"."img/logo.jpg";
			
			
			$mail = new PHPMailer();
			
			$mail->IsHTML(true);
			$mail->SetFrom($GLOBALS["usr_email"], $GLOBALS["usr_name"]);
			
			$mail->AddEmbeddedImage($logo, 'my-logo', $logo);
			
			$body = '
			
						<html>
						<head>
						<style type="text/css">
						<!--
						body,td,th {
							font-family: Helvetica Neue, Helvetica, Arial;
							font-size: 11px;
							color: #000000;
							line-height:1.6em;
							
						}
						body {
							background-color: #ffffff;
							margin-left: 20px;
							margin-top: 20px;
							margin-right: 20px;
							margin-bottom: 20px;
						}
						.style2 {
							font-size: 16px;
							line-height:1.8em;
							
							display: inline;
							}
						.style5 {}
						.style6 {color: #FF0000}
			
						.pr_address{
							display: inline;
			
								font-size: 11px;
							color: #444444;
							line-height:1.6em;
							font-weight: bold;
						}
			
				
			
			
			
						-->
						</style>
						</head>
			
						<body>
						<table width="600" border="0" cellspacing="10" cellpadding="0">
						  <tr>
						    <td width="380" align="left" valign="top">
			
								<a href="'.$GLOBALS["local_url"].'"><img src="cid:my-logo" alt="my-logo"/></a>
							</td>
			
							<td align="left" valign="top">
			
			
									<span class="pr_address">
										Ian Green Residential <br/>
										T: 020 7586 1000<br/>
										F: 020 7586 1010<br/>
										E: info@iangreenresidential.com
			
									</span>
			
							</td>
						  </tr>
						</table>
			
			
						<table width="600" border="0" cellspacing="10" cellpadding="0">
						  <tr>
						    <td align="left" valign="top">
			
								<p class="style2">
									 Enquiry
								</p> <br/><br/>
			

								<table width="588" border="0" cellpadding="0" cellspacing="0" >


									  <tr>
									    <td width="100" height="30" align="left" valign="top">Name</td>
									    <td width="400" height="30" align="left" valign="top">'.$data->name_f.'</td>
									  </tr>

									<tr>
									    <td width="100" height="30" align="left" valign="top">Address</td>
									    <td width="400" height="30" align="left" valign="top">'.$data->address_f.'</td>
									  </tr>
									  <tr>
									    <td width="100" height="30" align="left" valign="top">Email</td>
									    <td width="400" height="30" align="left" valign="top">'.$data->email_f.'</td>
									  </tr>

									  <tr>
									    <td width="100" height="30" align="left" valign="top">Tel</td>
									    <td width="400" align="left" valign="top">'.$data->tel_f.'</td>
									  </tr>

									  <tr>
									    <td width="100" height="30" align="left" valign="top">Message</td>
									    <td width="400" align="left" valign="top">'.$data->enquiry_f.'</td>
									  </tr>


								</table>
								
					
								
								
			
			
							</td>
						  </tr>
						</table>
			
						</body>
						</html>
			
			';
			
			
			
			
			
			
			
			
			
			
			$mail->Subject  = "Enquiry";
			
			$mail->MsgHTML($body);
			
			$mail->WordWrap = 50;
			
			
			$mail->AddAddress($GLOBALS["usr_email"]);
			//$mail->AddAddress("yuki@priceassociates.co.uk");
			
			
			
			if(!$mail->Send()) {
			  return false;
			} else {
			  return true;
			}
			
			
			
			
	
	
		
		
		
	}
	
	
	
 }



 ?>