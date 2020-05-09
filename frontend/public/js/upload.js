$(document).ready(function() {
	$('.sidenav').sidenav();
});

$('.calc').calendar({
	type: 'date'
});

const ipfs = window.IpfsHttpClient({
    host: "ipfs.infura.io",
    port: 5001,
    protocol: "https",
});
const reportDataElement = document.getElementById('report-data');

async function createReport() {
	var img = document.getElementById("imgFile").files[0];
	if(img){
        // show the first modal
		$('.ui.basic.modal.mod1').modal('show');
        var ipfsURL;
        // get the patient public key
		patientPublicKey = document.getElementById('patientPublicKey').value;

		var name = document.getElementById('patientName').value,
			hospitalName = document.getElementById('hospitalName').value,
			admissionDate = document.getElementById('admissionDate').value,
			releaseDate = document.getElementById('releaseDate').value,
			symptoms = document.getElementById('symptoms').value,
			patientEmail = document.getElementById('patientEmail').value,
			comments = document.getElementById('comments').value;

		const reader = new FileReader();
		reader.onload = async function () {
			const file = { path: "test", content: buffer.Buffer(reader.result) };
			for await (const result of ipfs.add(file)) {
				console.log(result.cid.string);
				ipfsURL = `https://gateway.ipfs.io/ipfs/${result.cid.string}`
			}
			report = await {
					name: name,
					hospitalName: hospitalName,
					admissionDate: admissionDate,
					releaseDate: releaseDate,
					symptoms: symptoms,
					email: patientEmail,
					comments: comments,
					address: addr,
					ipfsURL: ipfsURL
			};
			encryptt(await report);
		};
        reader.readAsArrayBuffer(img);


	}else{
		$('.ui.basic.modal.mod4').modal('show');
	}

}
async function submitReport(report){
    // encrypt report;
    reportDataElement.value = JSON.stringify(report);
    console.log(reportDataElement.value);
    document.getElementById("patientDataForm").submit();

}



function addData(email) {

	var pwd = document.getElementById('pwd').value;
	var email = document.getElementById('email').value;
	console.log(email);
	console.log(pwd);

	web3.eth.accounts.wallet.load(pwd,email); //hardcoded email but fetch email from database
	console.log(web3.eth.accounts.wallet[0])
	//Signing and sending the transaction

	web3.eth.accounts.signTransaction(tx, web3.eth.accounts.wallet[0].privateKey).then((signed) => {
		web3.eth
			.sendSignedTransaction(signed.rawTransaction)
			.on('receipt', (i) => {
				console.log(i);
				$('#dimmer').dimmer('hide');
				$('.ui.basic.modal.mod2').modal('show');
			}) // this means transaction sent
			.on('error', (i) => {
				console.log(i);
				$('#dimmer').dimmer('hide');
				$('.ui.basic.modal.mod3').modal('show');
			}); // do the redirects now
	});
	$('#dimmer').dimmer('show');
}

console.log(ipfs);