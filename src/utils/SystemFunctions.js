class SystemFunctions{

    static changeStringBeetwenHomeAndMain(homeString){
        let subjectString = "";
        if(homeString == "Математика"){
            subjectString = "математики";
        }
        if(homeString == "Українська мова і література"){
            subjectString = "української мови і літератури";
        }
        if(homeString == "Англійська мова"){
            subjectString = "англійської мови";
        }
        if(homeString == "Історія України"){
            subjectString = "історії України";
        }
        if(homeString == "Біологія"){
            subjectString = "біології";
        }
        return subjectString;
    }

    static convertSubjectName(subject){
        if(subject == "Українська мова і література")
            return 'ULL';
        if(subject == "Історія України")
            return 'UHistory';
        if(subject == "Математика")
            return 'Math';
        if(subject == "Біологія")
            return 'Biology';
    }

    static stringsEqual(str1, str2){
        return (str1.localeCompare(str2) == 0);
    }

    static mainMenuActiveElement(active, tests, current){
        //console.log(active);
        //console.log(tests);
        for(let i in tests){
            if(tests[i].id == active)
                return i;
        }
        return current;
    }
}
export default SystemFunctions;