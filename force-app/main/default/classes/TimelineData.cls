public with sharing class TimelineData {
    
    public class TimelineGroup {
        @AuraEnabled
        public String groupId;
        @AuraEnabled
        public String groupContent;
    }
    
    public class TimelineItem {
        @AuraEnabled
        public String itemId;
        @AuraEnabled
        public String itemContent;
        @AuraEnabled
        public String itemStart;
        @AuraEnabled
        public String itemEnd;
        @AuraEnabled
        public String itemGroup;
        @AuraEnabled
        public String itemType;
        @AuraEnabled
        public String itemStyle;
    }
}
