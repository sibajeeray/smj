
##########################################################################################
# Script Name          : Email_util                          	           	             #
# Script Purpose       : Send mail with attachement 	                                 #
#                        Python				                                             #
# Script Author        : Rajesh       	                                                 #
# Script Version       : Version 0.1                  		        	                 #
# Version History      : 0.1    email
#                      : 0.2 create zip file for each run and email - Bincy urllib2,cookielib,
##########################################################################################

import os, time,base64,uuid,sys,zipfile,io,xml.etree.ElementTree,logging
import glob, shutil, filecmp, smtplib
from email.mime.text import MIMEText
from email import encoders
from email.message import Message
from email.mime.base import MIMEBase
from email.mime.multipart import MIMEMultipart  


SEND_EMAIL=1 # Set to 1 to send mail, Set to 0 to not send mail.



print("Hello")
print(sys.argv[8])
FileName= "D:\\Virtualization-RLS\\SMJ\\Simplified Assessment Journey_v0.6\\files\\"+sys.argv[2]
FileName2= "D:\\Virtualization-RLS\\SMJ\\Simplified Assessment Journey_v0.6\\files\\"+sys.argv[3]

file=sys.argv[2]
file2=sys.argv[3]
print(sys.argv[3])
print(file2)



if SEND_EMAIL !=0:
    # print("Inside mail")
    # Jon.O'Neill@anz.com,Stephen.Olifent@anz.com,Louisa.Sandstrom@anz.com,Ivan.Barretto@anz.com
    # Stephen.Olifent@anz.com,Louisa.Sandstrom@anz.com,Ivan.Barretto@anz.com
    themsg = MIMEMultipart()
    sender= 'sushanta.behera@anz.com'
    themsg['Subject'] = 'SMJ Assessment Result_ '+sys.argv[4]
    themsg['From'] = sender
    recipients = ''+sys.argv[1]
    themsg['To'] = recipients
    print(recipients)
    # themsg['To'] = sys.argv[1],"kumas104@anz.com"
    text = MIMEText("Hi "+sys.argv[8]+", \n Please find attached your SMJ Assessment completed on "+sys.argv[9]+"\n \n Please contact Testing Services Quality CoE to discuss results and to work out the next steps to continue your journey. \n \nThanks\nTesting Services QCoE")
    themsg.attach(text)
    msg = MIMEBase('application', "octet-stream")
    msg2 = MIMEBase('application', "octet-stream")
    data1 = open(FileName,"rb")
    data2 = open(FileName2,"rb")
    # print(data)
    msg.set_payload(data1.read())
    msg2.set_payload(data2.read())
    # msg.set_payload("Hello")sys.argv[1]
    encoders.encode_base64(msg)
    encoders.encode_base64(msg2)
    data1.close()
    data2.close()
    msg.add_header('Content-Disposition', 'attachment;filename="%s"'%file)
    msg2.add_header('Content-Disposition', 'attachment;filename="%s"'%file2)
    themsg.attach(msg)
    themsg.attach(msg2)

    s = smtplib.SMTP('outlookau.corp.anz.com')
    r1=s.starttls()
    r1=s.login('global\\beheras4', 'Kumar@2019')
    print("Email Login successful")
    print(sender)
    print(recipients)
    r1=s.sendmail(sender,recipients, themsg.as_string())
    r1=s.quit()
    # print("Sucessful")
    print("Email was sent to the recipients with the report attached.")
else:
    print("Send email option not selected, please check the reports file.")
