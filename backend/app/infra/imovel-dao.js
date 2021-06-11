
const maxRows = 12;

class ImovelDao {

    constructor(db) {
        this._db = db;
    }

    listAllFromUser(userId, page) {
        const from = (page - 1) * maxRows;

        let limitQuery = '';

        if (page) limitQuery = `LIMIT ${from}, ${maxRows}`;

        return new Promise((resolve, reject) => {
            this._db.all(`
            SELECT  p.*
            FROM imoveis AS p
            where p.user_id = ?
                  ORDER BY p.imovel_post_date DESC
                ${limitQuery} ;
                `,
                [userId],
                (err, rows) => {
                    const imoveis = rows
                    if (err) {
                        console.log(err);
                        return reject('Não conseguimos listar os produtos');
                    }
                  
                    resolve(imoveis);
                });
        });
    }

    listAll(page) {

        return new Promise((resolve, reject) => {
            this._db.all(`
                SELECT  p.* FROM imoveis AS p
                ORDER BY p.imovel_post_date DESC ;
                `,
                (err, rows) => {
                     const imoveis = rows
                    if (err) {
                        console.log(err);
                        return reject('Não conseguimos listar os produtos');
                    }
                    resolve(imoveis);
                });
        });
    }


    add(dados, user_id) {
        console.log('dadospara incluir', dados)
        return new Promise((resolve, reject) => {
            this._db.run(`
                INSERT INTO imoveis (
                    imovel_post_date, photo_url,descricao,logradouro, 
                    cidade, estado, complemento, titulo, 
                    anoimovel, valor, cep, numero, bairro, area, quartos, 
                    banheiros, garagem, idstatus, status, 
                    idtipo, tipo, user_id
                ) values (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
                [
                    new Date(),
                    dados.url, dados.descricao, dados.endereco, dados.cidade, dados.estado, 
                    dados.complemento, dados.titulo, dados.ano, dados.valor, 
                    dados.cep, dados.numero, dados.bairro, dados.area, dados.quartos, 
                    dados.banheiros, dados.garagem, dados.idstatus, dados.status, 
                    dados.idtipo, dados.tipo, user_id
                ],
                function (err) {
                    if (err) {
                        console.log(err);
                        return reject('Não foi possivel adicionar os dados');
                    }
                    resolve(this.lastID);
                });
        });
    }

    upd(dados, user_id) {
        console.log('dadospara update', dados)
        return new Promise((resolve, reject) => {

            let data = [new Date(), dados.url, dados.descricao, dados.titulo,
                        dados.anoimovel, dados.valor, dados.cep, dados.logradouro, dados.numero,
                        dados.complemento, dados.bairro, dados.cidade, dados.estado, dados.imovelId];
            let sql = `UPDATE imoveis
                        SET 
                        imovel_change_date = ?,
                        photo_url = ?,
                        descricao = ?, 
                        titulo = ?, 
                        anoimovel = ?, 
                        valor = ?,
                        cep = ?, 
                        logradouro = ?,
                        numero = ?,
                        complemento = ?,
                        bairro = ?,
                        cidade = ?,
                        estado = ? 
                        WHERE imovel_id = ?`;
            this._db.run(sql, data, function(err) {
              if (err) {
                return console.error(err.message);
              }
              console.log(`Row(s) updated: ${this.changes}`);
            
            });
            
        });
    }

    findById(id) {

        return new Promise((resolve, reject) => this._db.get(`
            SELECT  p.* FROM imoveis AS p
            WHERE p.imovel_id = ?
            ORDER BY p.imovel_post_date DESC
            `,
            [id],
            (err, row) => {
                if (err) {
                    console.log(err);
                    return reject('Imovel não encontrado');
                }
                if (row) {
                    resolve(row);
                } else {
                    resolve(null);
                }
            }
        ));
    }

    remove(id) {
        return new Promise((resolve, reject) => this._db.run(
            `DELETE FROM imoveis WHERE imovel_id in (?)`, id, function(err) {
            if (err) {
              return console.error(err.message);
            }
            console.log(`Row(s) deleted ${this.changes}`);
          }
        ));
    }

    

    imovelByUser(userId) {
        console.log('usuario dentro da api', userId)
        return new Promise((resolve, reject) => this._db.run(
            `
            SELECT  p.* FROM imoveis AS p
            WHERE p.user_id = 2`, function(err, row) {
                if (err) {
                    console.log(err);
                    return reject('Não há imoveis para esse usuario');
                }
                resolve(row);
            }
        ));

    }
}

module.exports = ImovelDao; 