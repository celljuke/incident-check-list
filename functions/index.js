const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//

let priority_emojis = {
    P1: ":small_red_triangle: P1",
    P2: ":small_red_triangle: P2",
    P3: ":small_orange_diamond: P3",
    P4: ":small_orange_diamond: P4",
    P5: ":small_orange_diamond: P5"
};

let color_map = {
    open: "#e5391c",
    closed: "#36a64f"
};

let in_progress_map = {
    author_name: ":white_large_square: Waiting for an action",
    color: "#E57A1C"
};

let roles_to_firebase_map = {
    "Remember to Assign Roles": "assignRoles",
    "Start an ICC Session": "icc",
    "Send internal communication": "internalCommunication",
    "Update status page": "statusPage",
    "Create a warroom": "warRoom"
};

let attachments = [
    {
        "fallback": "Ooops",
        "color": "#337AE8",
        "author_link": "https://resources.opsgenie.com/favicon.ico?_r=20181115101246",
        "author_icon": "https://resources.opsgenie.com/favicon.ico?_r=20181115101246",
        "text": "INC-003 SMS services are down, many regions are affected",
        "fields": [
            {
                "title": "Priority",
                "value": ":small_red_triangle: P1"
            }
        ],
        "footer": "Atlassian Opsgenie",
        "footer_icon": "https://resources.opsgenie.com/favicon.ico?_r=20181115101246",
        "ts": 123456789
    },
    {
        "fallback": "Here is a checklist item.",
        "pretext": ":point_down: ------------ :ledger: Your incident Checklist --------------------",
        "color": "#36a64f",
        "author_name": ":white_check_mark: Done!",
        "text": "Remember to Assign Roles",
        "fields": [
            {
                "title": "Incident Commander",
                "value": "John Black",
                "short": "true"
            },
            {
                "title": "Scribe",
                "value": "Jeny Cool",
                "short": "true"
            },
            {
                "title": "Comminication Officer",
                "value": "Kağan Yıldız",
                "short": "true"
            }
        ]
    },
    {
        "fallback": "Here is a checklist item.",
        "color": "#36a64f",
        "author_name": ":white_check_mark: Done!",
        "text": "Create a warroom",
        "fields": [
            {
                // todo selcuk we may update this fields based on data in firebase
                "title": "#whooooaah"
            }
        ]
    },
    {
        "fallback": "Here is a checklist item.",
        "color": "#36a64f",
        "author_name": ":white_check_mark: Done!",
        "text": "Start an ICC Session"
    },
    {
        "fallback": "Here is a checklist item.",
        "color": "#36a64f",
        "author_name": ":white_check_mark: Done!",
        "text": "Update status page",
        "fields": [
            {
                // todo selcuk we may update this fields based on data in firebase
                "title": "http://kerti.co"
            }
        ]
    },
    {
        "fallback": "Here is a checklist item.",
        "color": "#36a64f",
        "author_name": ":white_check_mark: Done!",
        "text": "Send internal communication"
    }
];

exports.slackSlashCommandHandler = functions.https.onRequest((request, response) => {
    if (request.body.text === "") {
        response.send(`Tiny id has to be provided :unamused:`);
    }
    let query;
    admin.firestore().collection('incidents').doc('9UVFK13wkCgrTz3iMYLp').get().then(snapshot => {
        const data = snapshot.data();
        query = data;
        console.log(data);
        return data;
    }).catch(error => {
        console.log(error);
        response.sendStatus(500).send(error)
    });

    attachments[0].text = query.incident.message;
    attachments[0].fields[0].value = priority_emojis.query.incident.priority; // get priority from map
    attachments[0].ts = query.incident.createdAt;
    attachments[0].color = color_map.query.incident.status;

    let assignRoles = "Remember to Assign Roles";
    attachments.forEach((i, idx, value) => {
        if (idx !== 0) {
            if (i.text === assignRoles) {
                //todo selcuk based on  structure it needs to be updated
            } else {
                let firebase_key = roles_to_firebase_map.i.text;
                if (query.status.firebase_key.status === "open") {
                    i.color = in_progress_maps.color;
                    i.author_name = in_progress_maps.author_name;
                }
            }
        }
    });
    response.contentType('application/json').status(200).send({
        attachments: attachments
    });
});
