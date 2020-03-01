
##########################################################################################
# Script Name          : Email_util                          	           	             #
# Script Purpose       : Send mail with attachement 	                                 #
#                        Python				                                             #
# Script Author        : Rajesh       	                                                 #
# Script Version       : Version 0.1                  		        	                 #
# Version History      : 0.1    email
#                      : 0.2 create zip file for sending pwd reset mail- Sushant(sys)
##########################################################################################

import os,sys,time,base64,uuid,sys,zipfile,io,xml.etree.ElementTree,logging
import glob, shutil, filecmp, smtplib
from email.mime.text import MIMEText
from email import encoders
from email.message import Message
from email.mime.base import MIMEBase
from email.mime.multipart import MIMEMultipart  


SEND_EMAIL=1 # Set to 1 to send mail, Set to 0 to not send mail.


if SEND_EMAIL !=0:
    themsg = MIMEMultipart()
    themsg['Subject'] = 'Password Reset link'
    themsg['From'] = 'beheras4@anz.com'
    themsg['To'] = sys.argv[2]
    text = MIMEText("Click this http://10.52.244.3:5001/reset/"+sys.argv[1])
    themsg.attach(text)
    msg = MIMEBase('application', "octet-stream")

    msg.set_payload("Hello")
    encoders.encode_base64(msg)

    s = smtplib.SMTP('outlookau.corp.anz.com')
    r1=s.starttls()
    r1=s.login('global\\beheras4', 'Kumar@2019')
    r1=s.sendmail('beheras4@anz.com', sys.argv[2], themsg.as_string())
    r1=s.quit()
    print("Email was sent to the recipients with the report attached.")
else:
    print("Send email option not selected, please check the reports file.")
