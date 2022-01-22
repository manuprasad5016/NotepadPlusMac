public class NotepadHandler {
    
    @AuraEnabled
    public static List<DataWrapper> getData(){
        List<DataWrapper> wrapperList = new List<DataWrapper>(); 
        DataWrapper wrap = new DataWrapper();
        for(Notepad__c temp:[Select Id,Name from Notepad__c ORDER BY Name ASC]){
            wrap = new DataWrapper();
            wrap.Id = temp.Id;
            wrap.Name = temp.Name; 
            wrapperList.add(wrap);
        }
        return wrapperList;
    }

    @AuraEnabled
    public static String getTabData(String tabName){
        return [Select Id,Name,Content__c from Notepad__c where Name =:tabName].Content__c;
    }
    
    @AuraEnabled
    public static List<Notepad__c> saveData(String dataValue, String IdVar){
        try{
        	Notepad__c noteRec = new Notepad__c (Id =IdVar);
        	noteRec.Content__c  = dataValue;
        	update noteRec; 
        }catch(Exception ex){
            throw new AuraHandledException('Something went wrong');
        }
        return [Select Id,Name,Content__c from Notepad__c ORDER BY Name ASC];
    }
    
    @AuraEnabled
    public static List<Notepad__c> createNoteRec(){
        Notepad__c noteRec = new Notepad__c (); 
        insert noteRec; 
        return [Select Id,Name,Content__c from Notepad__c ORDER BY Name ASC];
    }
    
    public class DataWrapper{
        @AuraEnabled
        public String Id;
        @AuraEnabled
        public String Name;
        @AuraEnabled
        public String Content;
    }

}