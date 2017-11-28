<?php
if( ! preg_match('/(curl|wget)/i', $_SERVER['HTTP_USER_AGENT']) )
{
	$response = "Address: ". $_SERVER['REMOTE_ADDR'];
	$response .= "<br>";
	$response .= "User-Agent: ". $_SERVER['HTTP_USER_AGENT'];
}
else
{
	$filename = '-';
	$response = file_get_contents($filename);
}

echo $response;
