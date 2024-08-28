import chalk from 'chalk';
import readlineSync from 'readline-sync';

class Player {
  constructor(stage) {
    this.hp = 100 + Math.floor(((Math.random() * 30) + 50) * stage);
    this.atk = 36.5 + Math.floor((Math.random() * 20) + 40)* stage;
    this.run = Math.floor((Math.random() * 5) + 0.1);;
  }

  attack() {
    // 플레이어의 공격
    return (`몬스터에게 ${this.atk}의 피해를 입혔습니다.`);
  }
  runaway() {
    return (`몬스트에서  ${this.run} 확률로 도망칠수있습니다.\n도망치시겠습니까?`);
  }
}

class Monster {
  constructor(stage) {
    this.hps = 50 + Math.floor(((Math.random() * 20) + 50) * stage);
    this.atks = 24.5 + Math.floor((Math.random() * 10) + 20) * stage;
  }

  attack() {
    // 몬스터의 공격
    return (`몬스터에게 ${this.atks}의 피해를 입었습니다.`);
  }
}


function displayStatus(stage, player, monster) {
  console.log(chalk.magentaBright(`\n=== Current Status ===`));
  console.log(
    chalk.cyanBright(`| Stage: ${stage} `) +
    chalk.blueBright(
      `| Player  HP : ${player.hp} , Attack : ${player.atk} `,
    ) +
    chalk.redBright(
      `| Monster Hp : ${monster.hps} , Attack : ${monster.atks} |`,
    ),
  );
  console.log(chalk.magentaBright(`=====================\n`));
  console.log(chalk.red(`야생에서 몬스터를 만났습니다.`));
}

const battle = async (stage, player, monster) => {
  let logs = [];

  while (player.hp > 0) {
    console.clear();
    displayStatus(stage, player, monster);

    logs.forEach((log) => console.log(log));

    console.log(
      chalk.green(
        `\n1. 공격하기 2. 도망치기. 3.확인 `,
      ),
    );
    const choice = readlineSync.question('당신의 선택은? ');


    // 플레이어의 선택에 따라 다음 행동 처리
    switch (choice) {
      case "1":if (logs.push(chalk.green(player.attack()))) {
        monster.hps = monster.hps - player.atk;
        logs.push(chalk.red(monster.attack()))
        player.hp = player.hp - monster.atks;
      }
         
        break;
        

      case "2":logs.push(chalk.green(player.runaway())); 
      break;

      case "3":
        return;
        break;

    }
    if (monster.hps <= 0) {
      logs.push(chalk.green(`몬스터를 처치했습니다!`));
      logs.push(chalk.green(`다음 스테이지로 이동하시겠습니까?`));

    }
  }

};

export async function startGame() {
  console.clear();
  const player = new Player();
  let stage = 1;

  while (stage <= 10) {
    const monster = new Monster(stage);
    const player = new Player(stage);
    await battle(stage, player, monster);
    // 스테이지 클리어 및 게임 종료 조건
    if(stage <= 10){
      console.log("몬스터를 다 처지했습니다.");
      console.log("게임을 종료합니다.");
    }
   
    stage++
  }
}