const Telegram = require("node-telegram-bot-api");
const TOKEN = "2006891106:AAGo5WDkY7Hs-w7Pi-cKKUG1yT5ELcrY1nE";
const bot = new Telegram(TOKEN, {polling: true});

class Robot {
  constructor(_name) {
    this.name = _name;
    this.messagesArray = [];
    this.generatedMessage = "";
    this.granted = false;
    this.accessedUser = 0;
    this.repeatTime = 3;
  }

  add(_message) {
    this.messagesArray.push(_message);
  }

  getRandomItem() {
    return this.messagesArray[Math.floor(Math.random() * this.messagesArray.length)];
  }

  accessRobot(_password, id) {
    if(_password === "PASSWORD humoyun####") {
      this.granted = true;
      this.accessedUser = id;
      return "Access Granted.";
    }
    return "Access Denied";
  }

  setRepeatTime(_time) {
    return this.repeatTime = _time; 
  }

  doSeveral() {
    this.generatedMessage = "";
    for(var i = 0; i < this.repeatTime; i++) {
      this.generatedMessage += this.getRandomItem();
    }
    return this.generatedMessage;
  }

  reset() {
    this.messagesArray = [];
  }
}

const robot = new Robot("Mike");
bot.on("message", function(msg) {
  var chat_id = msg.chat.id;
  var message = msg.text;
  robot.accessRobot(message, chat_id);
  if(robot.granted && msg.from.id == 1824113828) {
    bot.sendMessage(robot.accessedUser, "Permission Granted! You are now admin of this bot. \n You can use the commands below: \n add \n reset \n doSeveral. \n messageswehave");
    if(/reset/i.test(message)) {
      robot.reset();
    } else if(/add\s+.*/i.test(message)) {
      robot.add(message.replace(/add/, ""));
    } else if(/doSeveral\s+.*/g.test(message)) {
      robot.setRepeatTime(message.replace(/\D/g, ""));
    } else if(/messageswehave/) {
      bot.sendMessage(robot.accessedUser, robot.messagesArray.toString());
    }else {
      bot.sendMessage(robot.accessedUser, "Unknown Admin Command");
    }
  }
  robot.add(" " + message);
  bot.sendMessage(chat_id, robot.doSeveral(), {
    reply_to_message_id: msg.message_id
  });
});
