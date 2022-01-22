import { LightningElement, track } from 'lwc';
import getData from "@salesforce/apex/NotepadHandler.getData";
import getTabData from "@salesforce/apex/NotepadHandler.getTabData";
import saveData from "@salesforce/apex/NotepadHandler.saveData";
import createData from "@salesforce/apex/NotepadHandler.createNoteRec";
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class NotepadPlusPlus extends LightningElement {
	@track recordValues = [];
	Description;
	contentString;
	error;
	onlyreadable = false;
	activeTabId;
	activeTabName;


	connectedCallback() {
		console.log('Notepad Loaded-->');
		getData()
			.then((result) => {
				this.recordValues = result;
				console.log('Get getData-->'+JSON.stringify(result));
				this.activeTabId = result[0].Id; 
			})
			.catch((error) => {
				this.showNotification('Warning', 'Something went Wrong', 'warning');
				this.error = error;
				console.error("Error getData-->" + JSON.stringify(error));
			});
	}

	handleTabChange(event) {
		this.activeTabId = event.target.value; 
		this.activeTabName = event.target.label;
		this.getTabDataMethod();
	}

	getTabDataMethod(){
		getTabData({ tabName: this.activeTabName })
			.then((result) => {
				this.contentString = result;
				//Iterate the tab list, identify based on id and push the content
				for (let index = 0; index < this.recordValues.length; index++) {
					const element = this.recordValues[index];
					if(element.Id == this.activeTabId){
						//element['Content'] = result;
						element.Content = result; 
					}else{
						element.Content = '';
					}
				}
			})
			.catch((error) => {
				this.showNotification('Warning', 'Something went Wrong', 'warning');
				this.error = error;
				console.error("Error getTabData-->" + JSON.stringify(error));
			});
	}

	getUpdatedString(event) {
		this.contentString = event.target.value;
	}

	saveHandler() {
		var temp = this.contentString.toString();
		saveData({ dataValue: temp, IdVar: this.activeTabId })
			.then((result) => {
				this.showNotification('Success', 'Note Saved Successfully', 'success');
			})
			.catch((error) => {
				this.showNotification('Warning', 'Something went Wrong', 'warning');
				this.error = error;
				console.error("Error List Views-->" + JSON.stringify(error));
			});
	}

	showNotification(titleVal, messageVal, variantVal) {
		const evt = new ShowToastEvent({
			title: titleVal,
			message: messageVal,
			variant: variantVal,
		});
		this.dispatchEvent(evt);
	}

	newTab() {
		createData()
			.then((result) => {
				this.recordValues = result; 
				this.getTabDataMethod();
			})
			.catch((error) => {
				this.showNotification('Warning', 'Something went Wrong', 'warning');
				this.error = error;
				console.error("Error createData-->" + JSON.stringify(error));
			});
	}
}
