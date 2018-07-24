var request = require("request");
var cheerio = require("cheerio");

export default {
  ActualAction() {
    return "Atualizando lista de Disciplinas";
  },

  login(matricula, senha) {
    request({
      uri: `https://pre.ufcg.edu.br:8443/ControleAcademicoOnline/Controlador?command=AlunoLogin&login=${matricula}&senha=${senha}`,
      jar: true
    }, function (error, response, body) {
      var $ = cheerio.load(body);
      let jsessionid = response.headers['set-cookie'][0].split(";")[0].split("=")[1];
      let erro = $("div[class='alert alert-danger']").text().replace(/(\r\n|\n|\r)/gm, "").trim();
      if (erro) {
        console.log(erro);
      } else {
        console.log("Login success");
      }
    });
  },

  getHistory() {
    request({
      uri: 'https://pre.ufcg.edu.br:8443/ControleAcademicoOnline/Controlador?command=AlunoHistorico',
      jar: true
    }, function (error, response, body) {
      var arrayData = [];

      if (!error) {
        function Disciplina(nome, codigo, tipo, creditos, carga, media, situacao, periodo) {
          a = {};

          a.disciplina = nome;
          a.codigo = codigo;
          //a.tipo = tipo;
          //a.creditos = creditos;
          //a.carga = carga;
          //a.media = media;
          a.situacao = situacao;
          a.periodo = periodo;
          return a;
        }
        var $ = cheerio.load(body);

        $('.table.table-bordered > tbody > tr').filter(function () {

          var infoArray = [];

          $(this).find('td').each(function () {
            infoArray.push($(this).text());
          });

          var codigo = infoArray[0];
          var nome = infoArray[1];
          var tipo = infoArray[2].replace(/(\r\n|\n|\r)/gm, "");
          var creditos = infoArray[3];
          var carga = infoArray[4];
          var media = infoArray[5].replace(/(\r\n|\n|\r)/gm, "").trim();
          var situacao = infoArray[6].replace(/(\r\n|\n|\r)/gm, "");
          var periodo = infoArray[7];

          //var disciplina = disciplinaFactory(titulo, codigo, turma, horario, periodo);
          var disciplina = Disciplina(nome, codigo, tipo, creditos, carga, media, situacao, periodo);

          arrayData.push(disciplina);

        });
        console.log(arrayData);
      }
    });
  }
}