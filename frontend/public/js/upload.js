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
const reportDataElement = document.getElementById('data');
const patientAddressElement = document.getElementById('patientAddress')
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
					address: patientAddressElement.value,
					ipfsURL: ipfsURL
            };
            reportDataElement.value = JSON.stringify(report);
		};
        reader.readAsArrayBuffer(img);


	}else{
		$('.ui.basic.modal.mod4').modal('show');
	}

}
//async function submitReport(report){


 //   document.getElementById("patientDataForm").submit();

//}

