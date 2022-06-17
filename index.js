const request = require('request')
const art     = require('ascii-art')

class GameBot {
    bot_name = 'BlazeBot'
    constructor() {
        art.font(this.bot_name, 'Doom', (err, res) => {
            if (!err) {
                console.log(res)
                this.start_bot()
            } else {
                console.log(this.bot_name)
                this.start_bot()
            }
        })
    }

    write_screen(message) {
        console.log('[' + this.bot_name + '] ' + message)
    }

    start_reading_double() {
        this.write_screen('Iniciando leitura dos números')
        let numbers = []
        var requestLoop = setInterval(() => {
            request('https://blaze.com/api/roulette_games/recent', (error, response, body) => {
                if (numbers.length === 0) {
                    numbers = JSON.parse(body)
                } else {
                    // check if the arrays are equal
                    if (JSON.stringify(numbers) !== JSON.stringify(JSON.parse(body))) {
                        numbers = JSON.parse(body)
                        switch (numbers[0].color) {
                            case 1:
                                var color = 'vermelho'
                                break;
                            case 2:
                                var color = 'preto'
                                break;
                            case 0:
                                var color = 'branco'
                                break;
                        }
                        this.write_screen('Novo número: ' + numbers[0].roll + ' - Cor: ' + color)
                    }
                }
            })
        }, 2500)
    }

    start_bot() {
        this.write_screen('Inicializando o bot, aguarde...')
        this.start_reading_double()
    }
}

var worker = new GameBot()
