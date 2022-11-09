import axios from "axios";
import firebase from "../global"
import React from "react";
import Markdown from "markdown-to-jsx";
import { findRenderedDOMComponentWithClass } from "react-dom/test-utils";
import { type } from "jquery";

class Question {
    constructor(json) {
        this.number = json["Номер"];
        this.type = json["Format"];
        this.year = json["Рік"];
        this.number = json["Номер"];
        this.session = json["Сесія"];
        this.subject = json["Subject"];
        this.topic = json["Тема"];
        this.question = json["Питання"];
        this.answer = json["Правильна відповідь"];
        this.comment = json["Коментар"];
        this.isDoubleColumn = json["Розгорнутий вигляд"];

        /* ARTEM'S CODE. PLEASE BEWARE IT'S SHITTY */
        this.match_subquestions = [json["Частинка 1"], json["Частинка 2"], json["Частинка 3"], json["Частинка 4"]];
        this.match_explanations = [json["Пояснення 1"], json["Пояснення 2"], json["Пояснення 3"], json["Пояснення 4"]];
        this.match_4letters = [json["Частинка А"], json["Частинка Б"], json["Частинка В"], json["Частинка Г"]];
        this.match_5letters = [json["Частинка А"], json["Частинка Б"], json["Частинка В"],
            json["Частинка Г"], json["Частинка Д"]
        ];
        this.match_answers = [json["Правильна відповідь 1"], json["Правильна відповідь 2"],
            json["Правильна відповідь 3"], json["Правильна відповідь 4"]
        ];
        this.double_open_subquestion = [json["Завдання 1"], json["Завдання 2"]];
        this.double_open_answers = [json["Відповідь 1"], json["Відповідь 2"]];
        this.double_open_explanations = [json["Пояснення 1"], json["Пояснення 2"]];
        this.open_answer = json["Відповідь"];
        this.open_ended_sample = json["Зразкова відповідь"];
        this.history_3_7_answers = [json["Відповідь 1"], json["Відповідь 2"], json["Відповідь 3"], json["Відповідь 4"], json["Відповідь 5"], json["Відповідь 6"], json["Відповідь 7"]];
        this.history_3_7_explanations = [json["Пояснення 1"], json["Пояснення 2"], json["Пояснення 3"], json["Пояснення 4"], json["Пояснення 5"], json["Пояснення 6"], json["Пояснення 7"]];
        this.history_3_7_right_answers = [json["Правильна відповіль 1"], json["Правильна відповіль 2"], json["Правильна відповіль 3"]];
        /* END HERE */

        /* stupid code */
        this.bio3_question = json["Передумова"];
        this.bio3_firstquestion = json["Перше питання"];
        this.bio3_secondquestion = json["Друге питання"];
        this.bio3_thirdquestion = json["Третє питання"];

        this.bio3_firstquestion_firstanswer = json["Перше питання: Відповідь 1"];
        this.bio3_secondquestion_firstanswer = json["Друге питання: Відповідь 1"];
        this.bio3_thirdquestion_firstanswer = json["Третє питання: Відповідь 1"];

        this.bio3_firstquestion_secondanswer = json["Перше питання: Відповідь 2"];
        this.bio3_secondquestion_secondanswer = json["Друге питання: Відповідь 2"];
        this.bio3_thirdquestion_secondanswer = json["Третє питання: Відповідь 2"];

        this.bio3_firstquestion_thirdanswer = json["Перше питання: Відповідь 3"];
        this.bio3_secondquestion_thirdanswer = json["Друге питання: Відповідь 3"];
        this.bio3_thirdquestion_thirdanswer = json["Третє питання: Відповідь 3"];

        this.bio3_firstquestion_firstexplain = json["Перше питання: Пояснення 1"];
        this.bio3_secondquestion_firstexplain = json["Друге питання: Пояснення 1"];
        this.bio3_thirdquestion_firstexplain = json["Третє питання: Пояснення 1"];

        this.bio3_firstquestion_secondexplain = json["Перше питання: Пояснення 2"];
        this.bio3_secondquestion_secondexplain = json["Друге питання: Пояснення 2"];
        this.bio3_thirdquestion_secondexplain = json["Третє питання: Пояснення 2"];

        this.bio3_firstquestion_thirdexplain = json["Перше питання: Пояснення 3"];
        this.bio3_secondquestion_thirdexplain = json["Друге питання: Пояснення 3"];
        this.bio3_thirdquestion_thirdexplain = json["Третє питання: Пояснення 3"];

        this.bio3_firstquestion_answer = json["Перше питання: Правильна Відповідь"];
        this.bio3_secondquestion_answer = json["Друге питання: Правильна Відповідь"];
        this.bio3_thirdquestion_answer = json["Третє питання: Правильна Відповідь"];
        /* */
        var tmpArr = ["Відповідь А", "Відповідь Б", "Відповідь В",
            "Відповідь Г", "Відповідь Д", "Відповідь Е", "Відповідь A",
            "Відповідь B", "Відповідь C", "Відповідь D", "Відповідь E",
            "Відповідь G", "Відповідь F", "Відповідь H"
        ];
        var currArr = [];
        for (let i = 0; i < tmpArr.length; i++) {
            if (json[tmpArr[i]] != null) {
                currArr.push(json[tmpArr[i]]);
            }
            tmpArr[i] = tmpArr[i].replace("Відповідь", "Пояснення");
        }
        this.questions = currArr;
        currArr = [];
        for (let i = 0; i < tmpArr.length; i++) {
            if (json[tmpArr[i]] != null) {
                currArr.push(json[tmpArr[i]]);
            }
        }
        this.explanations = currArr;
    }
    get() {
        return this.explanations;
    }
    getNumber() {
        return this.number;
    }
    getType() {
        return this.type;
    }
    getYear() {
        return this.year;
    }
    getSubject() {
        return this.subject;
    }
    getTopic() {
        return this.topic;
    }
    getQuestion() {
        return this.question;
    }
    getAnswer() {
        return this.answer;
    }
    getComment() {
        return this.comment;
    }
    getQuestions() {
        // array of strings
        return this.questions;
    }
    getExplanations() {
        // array of strings
        return this.explanations;
    }
    getSession() {
        return this.session;
    }
    getMatchSubquestions() {
        return this.match_subquestions;
    }
    getMatchExplanations() {
        return this.match_explanations;
    }
    getMatch4Options() {
        return this.match_4letters;
    }
    getMatch5Options() {
        return this.match_5letters;
    }
    getMatchCorrectAnswers() {
        return this.match_answers;
    }
    getDoubleOpenSubquestion() {
        return this.double_open_subquestion;
    }
    getDoubleOpenAnswers() {
        return this.double_open_answers;
    }
    getDoubleOpenExplanations() {
        return this.double_open_explanations;
    }
    getOpenAnswer() {
        return this.open_answer; //THIS SHOULDN'T EXIST (change to normal getAnswer())
    }
    getOpenEndedSample() {
        return this.open_ended_sample;
    }
    getIsDoubleColumn() {
        return this.isDoubleColumn;
    }
    getHistory37Questions() {
        return this.history_3_7_answers;
    }
    getHistory37Explanations() {
        return this.history_3_7_explanations;
    }
    getHistory37Answers() {
        return this.history_3_7_right_answers;
    }
    getBio3_question() {
        return this.bio3_question;
    }
    getBio3_firstquestion() {
        let tmp = {
            question: this.bio3_firstquestion,
            firstAnswer: this.bio3_firstquestion_firstanswer,
            secondAnswer: this.bio3_firstquestion_secondanswer,
            thirdAnswer: this.bio3_firstquestion_thirdanswer,
            firstExplain: this.bio3_firstquestion_firstexplain,
            secondExplain: this.bio3_firstquestion_secondexplain,
            thirdExplain: this.bio3_firstquestion_thirdexplain,
            answer: this.bio3_firstquestion_answer
        };
        return tmp;
    }
    getBio3_secondquestion() {
        let tmp = {
            question: this.bio3_secondquestion,
            firstAnswer: this.bio3_secondquestion_firstanswer,
            secondAnswer: this.bio3_secondquestion_secondanswer,
            thirdAnswer: this.bio3_secondquestion_thirdanswer,
            firstExplain: this.bio3_secondquestion_firstexplain,
            secondExplain: this.bio3_secondquestion_secondexplain,
            thirdExplain: this.bio3_secondquestion_thirdexplain,
            answer: this.bio3_secondquestion_answer
        };
        return tmp;
    }
    getBio3_thirdquestion() {
        let tmp = {
            question: this.bio3_thirdquestion,
            firstAnswer: this.bio3_thirdquestion_firstanswer,
            secondAnswer: this.bio3_thirdquestion_secondanswer,
            thirdAnswer: this.bio3_thirdquestion_thirdanswer,
            firstExplain: this.bio3_thirdquestion_firstexplain,
            secondExplain: this.bio3_thirdquestion_secondexplain,
            thirdExplain: this.bio3_thirdquestion_thirdexplain,
            answer: this.bio3_thirdquestion_answer
        };
        return tmp;
    }

    areEqualStrNumbers(str1, str2) {
        let num1 = parseFloat(str1.replace(',', '.'))
        let num2 = parseFloat(str2.replace(',', '.'))

        return num1 == num2
    }

    checkCorrect(answerToCheck) {
        if (answerToCheck == null) return false;

        if (this.getType() == "ABCDE" || this.getType() == "ABCD") {
            return answerToCheck == this.answer;
        }
        if (this.getType() == "Open") {
            return this.areEqualStrNumbers(answerToCheck, this.open_answer);
        }
        if (this.getType() == "Geo_History_3_7") {
            for (let i of this.getHistory37Answers()) {
                if (answerToCheck == i)
                    return true;
            }
            return false;
        }
    }

    checkCorrectFromList(answerToCheck, index) {
        if (answerToCheck == null || answerToCheck == undefined) return false;
        if (this.getType() == "Double_Open") {
            return this.areEqualStrNumbers(answerToCheck, this.double_open_answers[index]);
        }
        if (this.getType() == "Bio_Triples") {
            if (index == 1) {
                return answerToCheck == this.bio3_firstquestion_answer;
            }
            if (index == 2) {
                return answerToCheck == this.bio3_secondquestion_answer;
            }
            if (index == 3) {
                return answerToCheck == this.bio3_thirdquestion_answer;
            }
        }
    }

    evaluate(answerToCheck) {
        //console.log(answerToCheck + " " + this.answer);
        //console.log((this.answer == 'А'))
        let res = [];
        if (this.getType() == "ABCDE" || this.getType() == "ABCD" || this.getType() == "ABCDE_OneColumn" || this.getType() == "ABCD_OneColumn") {
            if (answerToCheck == this.answer) {
                //alert("HERE 1");
                res.push(1);
                res.push(2);
            } else {
                //alert("HERE 2");
                res.push(0);
                res.push(0);
            }
            res.push(1);
        } else if (this.getType() == "Bio_Triples" || this.getType() == 'Bio_Triples_OneColumn') {
            let score = 0;
            if (answerToCheck != null && answerToCheck != undefined) {
                if (answerToCheck[0] == this.bio3_firstquestion_answer) {
                    ++score;
                }
                if (answerToCheck[1] == this.bio3_secondquestion_answer) {
                    ++score;
                }
                if (answerToCheck[2] == this.bio3_thirdquestion_answer) {
                    ++score;
                }
            }
            res.push(score);
            if (score == 0) {
                res.push(0);
            } else if (score == 3) {
                res.push(2);
            } else {
                res.push(1);
            }
            res.push(3);
        } else if (this.getType() == "Geo_History_3_7" || this.getType() == 'Geo_History_3_7_OneColumn') {
            let score = 0;
            if (answerToCheck != null && answerToCheck != undefined) {
                for (let i = 0; i < 3; ++i) {
                    for (let j = 0; j < 3; ++j) {
                        if (answerToCheck[i] == this.history_3_7_right_answers[j]) {
                            ++score;
                        }
                    }
                }
            }
            res.push(score);
            if (score == 0) {
                res.push(0);
            } else if (score == 3) {
                res.push(2);
            } else {
                res.push(1);
            }
            res.push(3);
        } else if (this.getType() == "Logic_Couples_4_4" || this.getType() == "Logic_Couples_4_5" || this.getType() == "Logic_Couples_4_4_OneColumn" || this.getType() == "Logic_Couples_4_5_OneColumn") {
            let score = 0;
            if (answerToCheck != null && answerToCheck != undefined) {
                for (let i = 0; i < 4; ++i) {
                    if (answerToCheck[i] == this.match_answers[i]) {
                        ++score;
                    }
                }
            }
            res.push(score);
            if (score == 0) {
                res.push(0);
            } else if (score == 4) {
                res.push(2);
            } else {
                res.push(1);
            }
            res.push(4);
        } else if (this.getType() == "Open") {
            if (answerToCheck != null && answerToCheck != undefined) {
                if (this.areEqualStrNumbers(answerToCheck, this.open_answer)) {
                    res.push(2);
                    res.push(2);
                } else {
                    res.push(0);
                    res.push(0);
                }
            }
            res.push(2);
        } else if (this.getType() == "Double_Open" || this.getType() == "Double_Open_OneColumn") {
            let score = 0;
            if (answerToCheck != undefined) {
                if (answerToCheck[0] != null && answerToCheck[0] != undefined) {
                    if (this.areEqualStrNumbers(answerToCheck[0], this.double_open_answers[0])) {
                        score += 2;
                    }
                }
                if (answerToCheck[1] != null && answerToCheck[1] != undefined) {
                    if (this.areEqualStrNumbers(answerToCheck[1], this.double_open_answers[1])) {
                        score += 2;
                    }
                }
            }

            res.push(score);
            if (score == 0) {
                res.push(0);
            } else if (score == 4) {
                res.push(2);
            } else {
                res.push(1);
            }
            res.push(4);
        } else if (this.getType() == "Open_Ended") {
            res.push(0);
            res.push(2);
            res.push(0);
        }
        return res;
    }



    evaluate2(answerToCheck) {
        //alert(answerToCheck + " " + this.answer);
        let res = [];
        if (this.getType() == "ABCDE" || this.getType() == "ABCD" || this.getType() == "ABCDE_OneColumn" || this.getType() == "ABCD_OneColumn") {
            if (answerToCheck == this.answer) {
                res = true;
            } else {
                res = false;
            }
        } else if (this.getType() == "Bio_Triples" || this.getType() == 'Bio_Triples_OneColumn') {
            if (answerToCheck != null && answerToCheck != undefined) {
                if (answerToCheck[0] == this.bio3_firstquestion_answer) {
                    res.push(true);
                } else {
                    res.push(false);
                }
                if (answerToCheck[1] == this.bio3_secondquestion_answer) {
                    res.push(true);
                } else {
                    res.push(false);
                }
                if (answerToCheck[2] == this.bio3_thirdquestion_answer) {
                    res.push(true);
                } else {
                    res.push(false);
                }
            }
        } else if (this.getType() == "Geo_History_3_7" || this.getType() == 'Geo_History_3_7_OneColumn') {
            if (answerToCheck != null && answerToCheck != undefined) {
                for (let i = 0; i < 3; ++i) {
                    let ok = 0;
                    for (let j = 0; j < 3; ++j) {
                        if (answerToCheck[i] == this.history_3_7_right_answers[j]) {
                            res.push(true);
                            ok = 1;
                        }
                    }
                    if (ok == 0) {
                        res.push(false);
                    }
                }
            }
        } else if (this.getType() == "Logic_Couples_4_4" || this.getType() == "Logic_Couples_4_5" || this.getType() == "Logic_Couples_4_4_OneColumn" || this.getType() == "Logic_Couples_4_5_OneColumn") {
            let score = 0;
            if (answerToCheck != null && answerToCheck != undefined) {
                for (let i = 0; i < 4; ++i) {
                    if (answerToCheck[i] == this.match_answers[i]) {
                        res.push(true);
                    } else {
                        res.push(false);
                    }
                }
            }
        } else if (this.getType() == "Open") {
            if (answerToCheck != null && answerToCheck != undefined) {
                if (this.areEqualStrNumbers(answerToCheck, this.open_answer)) {
                    res.push(true);
                } else {
                    res.push(false);
                }
            }
        } else if (this.getType() == "Double_Open" || this.getType() == "Double_Open_OneColumn") {
            if (answerToCheck != undefined) {
                if (answerToCheck[0] != null && answerToCheck[0] != undefined) {
                    if (this.areEqualStrNumbers(answerToCheck[0], this.double_open_answers[0])) {
                        res.push(true);
                    } else {
                        res.push(false);
                    }
                }
                if (answerToCheck[1] != null && answerToCheck[1] != undefined) {
                    if (this.areEqualStrNumbers(answerToCheck[1], this.double_open_answers[1])) {
                        res.push(true);
                    } else {
                        res.push(false);
                    }
                }
            }

        } else if (this.getType() == "Open_Ended") {
            res = null
        }
        return res;
    }

}

class Services {
    constructor() {}

    static async getData(ref) {
        var storage = firebase.storage();
        var listRef = storage.refFromURL(ref);
        const list1 = await listRef.listAll().then(function(res) {
                var list = [];
                res.items.forEach(function(itemRef) {
                    list.push(itemRef.getDownloadURL())
                });
                return list
            })
            .catch(function(error) {
                console.log(error)
            });
        const results1 = await Promise.all(list1);
        var list2 = [];
        results1.forEach(url => {
            list2.push(axios.post(
                'https://europe-west3-mavka-c5c01.cloudfunctions.net/getReq', {
                    url: url
                }, { headers: { 'Content-Type': 'text/plain' } }
            ))
        })
        const results2 = await Promise.all(list2);
        let answer = [];
        results2.forEach(resp => {
            answer.push(resp.data)
        });
        return answer
    }

    static async getTeamInfo() {
        const firestore = firebase.firestore();
        return await firestore.collection("team").doc("team-names").get().then(doc => {
            return doc.get("Team");
        });
    }

    static async getReferenceById(id) {
        const firestore = firebase.firestore();
        return await firestore.collection("practices_id").doc(id).get().then(doc => {
            return doc.get("ref");
        });
    }

    static async getReferenceById(id) {
        const firestore = firebase.firestore();
        return await firestore.collection("practices_id").doc(id).get().then(doc => {
            return doc.get("ref");
        });
    }
    static async getTechnicalPauseStatus() {
        const firestore = firebase.firestore();
        return await firestore.collection("services").doc('technicalPause').get().then(doc => {
            return doc.get("pause");
        });
    }


    static async checkFeedbackSurvey(token) {
        const response = await axios.post(
            'https://europe-west3-mavka-c5c01.cloudfunctions.net/checkFeedbackSurvey', {
                token: token,
            }, { headers: { 'Content-Type': 'text/plain' } }
        )
        //console.log(response.data)
        return response.data;
    }

    static async getReqForm(url) {
        const response = await axios.post(
            'https://europe-west3-mavka-c5c01.cloudfunctions.net/getReqForm', {
                url: url,
            }, { headers: { 'Content-Type': 'text/plain' } }
        )
        //console.log(response.data)
        return response.data;
    }

    static async getDemographicsSurvey(user) {
        //console.log(user);
        if (user != null) {
            const firestore = firebase.firestore();
            return await firestore.collection("users").doc(user.uid).get().then(doc => {
                return doc.get("demographicsSurvey");
            });
        } else {
            return 'false';
        }
    }

    static async setDemographicsSurvey(user, val) {
        //console.log(user);
        if (user != null && typeof user.uid != 'undefined') {
            const firestore = firebase.firestore();
            let flag = 0;
            await firestore.collection("users").doc(user.uid).get().then(doc => {
                if (doc.get("demographicsSurvey") == "false") {
                    flag = 1
                }
            });

            if (flag == 1) {
                return;
            }

            return await axios.post(
                'https://europe-west3-mavka-c5c01.cloudfunctions.net/setDemographicsSurvey', {
                    uid: user.uid,
                    val: val
                }, { headers: { 'Content-Type': 'text/plain' } }
            )
        } else {
            return 'false';
        }
    }

    static getQuestionClass(json) {
        return new Question(json);
    }
    static async updateTestAnswers(token, testID, answers) {
        const response = await axios.post(
            'https://europe-west3-mavka-c5c01.cloudfunctions.net/updCourseAnswers', {
                token: token,
                courseID: testID,
                answers: answers
            }, { headers: { 'Content-Type': 'text/plain' } }
        )
    }
    static async getTestAnswers(token, testID) {
        const response = await axios.post(
            'https://europe-west3-mavka-c5c01.cloudfunctions.net/getTestAnswers', {
                token: token,
                courseID: testID
            }, { headers: { 'Content-Type': 'text/plain' } }
        )
        return response;
    }

    static async changeTestStatusByID(token, testID, status) {
        const response = await axios.post(
            'https://europe-west3-mavka-c5c01.cloudfunctions.net/changeStatusById', {
                token: token,
                id: testID,
                status: status
            }, { headers: { 'Content-Type': 'text/plain' } }
        )
    }

    static async deleteTestByID(token, testID) {
        const response = await axios.post(
            'https://europe-west3-mavka-c5c01.cloudfunctions.net/deleteCourseById', {
                token: token,
                id: testID,
            }, { headers: { 'Content-Type': 'text/plain' } }
        )
    }

    static async getTeamInfo() {
        const firestore = firebase.firestore();
        return await firestore.collection("team").doc("team-names").get().then(doc => {
            return doc.get("Team");
        });
    }
}
export default Services;