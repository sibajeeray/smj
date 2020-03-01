const puppeteer = require('puppeteer');

var generatePdf = async (tribedata, users, completion_date) => {

  // const businessname = tribedata.businessname;
  
  const squadname = tribedata.squadname;
  const talname = tribedata.talname;
  const tplname = tribedata.tplname;

  var businessname = tribedata.businessname;
  switch (businessname) {
    case '94671':
      businessname = 'Australia Retail And Commercial';
      break;
    case '94672':
      businessname = 'Banking Services';
      break;
    case '94673':
      businessname = 'Business Automation And Integration';
      break;
    case '94674':
      businessname = 'Customer Operations';
      break;
    case '94675':
      businessname = 'Data Services';
      break;
    case '94676':
      businessname = 'Employee Experience';
      break;
    case '94677':
      businessname = 'Infrastructure As A Service';
      break;
    case '94678':
      businessname = 'Institutional';
      break;
    case '94679':
      businessname = 'New Zealand';
      break;
    case '94680':
      businessname = 'Security';
      break;
    case '94681':
      businessname = 'Technology Business Management';
      break;
    case '94682':
      businessname = 'Technology Transformation';
      break;
    case '94683':
      businessname = 'Wealth';
      break;
    default:
      businessname = 'Unknown Business';
      break;
  }

  var tribename = tribedata.tribename;
  switch (tribename) {
    case '94712':
      tribename = 'Assurance COE';
      break;
    case '94741':
      tribename = 'Assurance Compliance And Security';
      break;
    case '94708':
      tribename = 'BAI Domain Exec';
      break;
    case '94684':
      tribename = 'Banker Experience';
      break;
    case '94748':
      tribename = 'Tribe Automation & Integration';
      break;
    case '94685':
      tribename = 'Tribe Lending';
      break;
    case '94763':
      tribename = 'Tribe Operations';
      break;
    case '94686':
      tribename = 'Tribe Owners';
      break;
    case '94731':
      tribename = 'Cloud Services';
      break;
    case '94732':
      tribename = 'Commodity Compute Services';
      break;
    case '94749':
      tribename = 'Core Banking';
      break;
    case '94687':
      tribename = 'Core Systems';
      break;
    case '94723':
      tribename = 'Corporate Experience';
      break;
	case '94713':
      tribename = 'Credit Cards And Personal Lending';
      break;
    case '94688':
      tribename = 'Customer Authentication';
      break;
    case '94689':
      tribename = 'Customer Contact';
      break;
    case '94690':
      tribename = 'Customer Self Service';
      break;
    case '94714':
      tribename = 'Customer Service Operations';
      break;
    case '94758':
      tribename = 'Cyber Defence';
      break;
    case '94750':
      tribename = 'Data & Analytics';
      break;
    case '94733':
      tribename = 'Data Centre Management Services';
      break;
    case '94718':
      tribename = 'Data Ecosystem And Advanced Analytics';
      break;
    case '94719':
      tribename = 'Data Lifecycle Evolution';
      break;
    case '94720':
      tribename = 'Data Services - Customer';
      break;
    case '94691':
      tribename = 'Deposits & Wealth';
      break;
    case '94715':
      tribename = 'Deposits And Wealth';
      break;
	case '94692':
      tribename = 'Digital Customer Experience';
      break;
    case '94742':
      tribename = 'Digital Data And Transaction Banking';
      break;
    case '94693':
      tribename = 'Digital Sales Experience';
      break;
    case '94709':
      tribename = 'Document And Knowledge Management';
      break;
    case '94773':
      tribename = 'Edison';
      break;
    case '94751':
      tribename = 'Employee Experience';
      break;
    case '94724':
      tribename = 'Enablement';
      break;
    case '94769':
      tribename = 'Engineering Acceleration';
      break;
    case '94710':
      tribename = 'Enterprise Apis & Integration Services';
      break;
    case '94734':
      tribename = 'Enterprise Compute';
      break;
    case '94764':
      tribename = 'Enterprise Continuity';
      break;
    case '94722':
      tribename = 'Enterprise Data Platforms';
      break;
    case '94765':
      tribename = 'Enterprise Enablement';
      break;
	case '94725':
      tribename = 'Enterprise Mobility';
      break;
    case '94726':
      tribename = 'Enterprise Mobility Tech Area';
      break;
    case '94700':
      tribename = 'Enterprise Risk Technology Services';
      break;
    case '94694':
      tribename = 'Everyday Banking';
      break;
    case '94701':
      tribename = 'Financial Crime & Retail Decisioning';
      break;
    case '94743':
      tribename = 'Fixed Income-Derivatives-Currencies & Market Risk';
      break;
    case '94744':
      tribename = 'Foreign Exchange Services';
      break;
    case '94716':
      tribename = 'Fraud Collections And Workflow';
      break;
    case '94695':
      tribename = 'Home Lending';
      break;
	case '94696':
      tribename = 'Home Owners';
      break;
    case '94735':
      tribename = 'Iaas Enablement Services';
      break;
    case '94736':
      tribename = 'Iaas Platform Services';
      break;
    case '94766':
      tribename = 'Identity Access Management';
      break;
    case '94759':
      tribename = 'Information Protection';
      break;
	case '94745':
      tribename = 'Institutional Support & Tech Operations';
      break;
    case '94774':
      tribename = 'Insurance Services';
      break;
    case '94702':
      tribename = 'Integration Services';
      break;
    case '94697':
      tribename = 'Marketing Aus COE';
      break;
    case '94698':
      tribename = 'Net Promoter System COE';
      break;
    case '94737':
      tribename = 'Network & Storage Services';
      break;
    case '94738':
      tribename = 'Network And Storage Services';
      break;
    case '94770':
      tribename = 'New Ways Of Delivery - COE';
      break;
    case '94752':
      tribename = 'New Zealand';
      break;
    case '94771':
      tribename = 'NWOW @ Scale';
      break;
    case '94753':
      tribename = 'NZ & Pacific';
      break;
    case '94754':
      tribename = 'Omni Channel Assisted';
      break;
    case '94755':
      tribename = 'Omni Channel Customer Experience';
      break;
	case '94703':
      tribename = 'Open Banking';
      break;
    case '94767':
      tribename = 'Operational Tools & Services';
      break;
    case '94746':
      tribename = 'Operations Automation And Core Banking';
      break;
    case '94704':
      tribename = 'Payments And Merchant Services';
      break;
    case '94705':
      tribename = 'Payments And Transactions Services';
      break;
    case '94756':
      tribename = 'Payments Wholesale Switching';
      break;
    case '94739':
      tribename = 'Platform And Enablement Services';
      break;
    case '94747':
      tribename = 'Regulatory And Compliance';
      break;
    case '94699':
      tribename = 'Responsible Banking';
      break;
    case '94706':
      tribename = 'Retail Credit Risk';
      break;
    case '94760':
      tribename = 'Risk Management';
      break;
    case '94761':
      tribename = 'Security In Change COE';
      break;
    case '94717':
      tribename = 'Simplification COE';
      break;
	case '94740':
      tribename = 'Strategic Initiatives';
      break;
    case '94762':
      tribename = 'Strategy Influence And Policy';
      break;
    case '94727':
      tribename = 'Support';
      break;
    case '94768':
      tribename = 'TBM Office';
      break;
    case '94728':
      tribename = 'Teaming';
      break;
    case '94757':
      tribename = 'Tech Operations';
      break;
    case '94729':
      tribename = 'Testing Services';
      break;
    case '94772':
      tribename = 'Transform And Operate';
      break;
    case '94775':
      tribename = 'Wealth';
      break;
    case '94707':
      tribename = 'Wholesale Group Risk';
      break;
    case '94711':
      tribename = 'Workflow And Automation';
      break;
    case '94730':
      tribename = 'Workplace';
      break;
    
    default:
      tribename = 'Unknown Tribe';
      break;
  }

  const username = users.name;
  const pwd = users.normalpwd;
  const email = users.email;
  const date = completion_date;

  console.log('Inside PDF generator.. ');
  const browser = await puppeteer.launch({ defaultViewport: { width: 1920, height: 1080 } });
  const page = await browser.newPage();

  await page.goto('http://localhost:5001/');
  // await page.click("a[href='/signup/']");
  await page.type('#email', email);
  await page.type('#password', pwd);
  await page.click('[type="submit"]', { waitUntil: 'networkidle0' });
  await page.waitFor(2000);
  //Code for removing hyperlink from PDF
  await page.evaluate(() => {
    let example = document.querySelector('#example');
    example.parentNode.removeChild(example);
  });
  //Code for removing hyperlink from PDF
  // await page.screenshot({ path: 'files/' + email + '.png', format: 'A4' }, { waitUntil: 'networkidle0' });
  await page.pdf({ path: 'files/' + email + '.pdf', format: 'A4', printBackground: true }, { waitUntil: 'networkidle0' });
  await page.goto('http://localhost:5001/survey/review-survey');
  await page.waitFor(2000);
  await page.evaluate(() => {
    let removefirst = document.querySelector('#removefirst');
    removefirst.parentNode.removeChild(removefirst);

    let removesecond = document.querySelector('#removesecond');
    removesecond.parentNode.removeChild(removesecond);
  });
  await page.pdf({ path: 'files/' + email + '_assessment_data.pdf', format: 'A4', printBackground: false }, { waitUntil: 'networkidle0' });
  console.log('PDF generated successfully.. ');
  await page.click('[value="Logout"]');
  await browser.close();
  const path = email + '.pdf';
  const path2 = email + '_assessment_data.pdf';
  const email2 = email;
  await page.waitFor(2000);
  console.log(' '+email2+' '+' '+' '+path+''+businessname+''+tribename+''+talname+''+tplname+''+username+''+date);
  
  // const { spawn } = require('child_process');
  // const pyProg = await spawn(
  //   `D:\\RLS-Softwares(Do Not Delete)\\Python\\python.exe`,
  //   ['D:\\Virtualization-RLS\\SMJ\\Simplified Assessment Journey_v0.6\\Email_Util.py',
  //     email2,
  //     path,
  //     path2,
  //     businessname,
  //     tribename,
  //     talname,
  //     tplname,
  //     username,
  //     date
  //   ]);

  // pyProg.stdout.on('data', function (data) {

  //   console.log(data.toString());
  //   // res.write(data);
  //   // res.end('end');
  // });

  console.log("Email sent");
  

}

module.exports = generatePdf;