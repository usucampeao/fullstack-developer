// import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Immobile from "App/Models/Immobile";
import { schema, rules } from "@ioc:Adonis/Core/Validator";
import axios from "axios";

export default class ImmobilesController {

    public async index({request, response}) {
        try {
            const page = request.param('page') || 1;
            const limit = request.param('limit') || 10;

            const listImmobiles = await Immobile
                                            .query()
                                            .orderBy('created_at', 'desc')
                                            .paginate(page, limit);
            return response.status(200).json(listImmobiles);
        } catch (e) {
            return response.status(500).json({err: e});
        }
    }

    public async show({request, response}) {
        try {
            const immobile = await Immobile.findOrFail(request.param('id'));
            return response.status(200).json(immobile);
        } catch (e) {
            return response.status(500).json({err: e});
        }
    }

    public async fetch({request, response}) {
        try {
            const data = request.body();

            const state = data.state || null;
            const city = data.city || null;
            const district = data.district || null;
            const address = data.address|| null;
            const page = data.page || 1;
            const limit = data.limit || 10;

            let sql = '';

            if(state !== null){
                sql += `state = '${state}'`;
            }

            if(city !== null){
                sql !== '' ? sql += `AND city = '${city}'` : sql += `city = '${city}'`;
            }

            if(district !== null) {
                sql !== '' ? sql += `AND district = '${district}'` : sql += `district = '${district}'`;
            }

            if(address !== null) {
                sql !== '' ? sql += `AND address like '%${address}%'` : sql += `address like '%${address}%'`;
            }

            let listImmobiles;

            if(sql !== ''){
                listImmobiles = await Immobile
                                            .query()
                                            .whereRaw(sql)
                                            .orderBy('created_at', 'desc')
                                            .paginate(data.page, data.limit);
            } else {
                listImmobiles = await Immobile
                                            .query()
                                            .orderBy('created_at', 'desc')
                                            .paginate(data.page, data.limit);
            }

            return response.status(200).json(listImmobiles);
        } catch (e) {
            return response.status(500).json({err: e});
        }
    }

    public async store({request, response}) {
        try{
            const immobilesSchema = schema.create({
                title: schema.string({}, [
                    rules.required(),
                    rules.maxLength(244)
                ]),
                description: schema.string({}, [
                    rules.required(),
                ]),
                amount: schema.number([
                    rules.required(),
                ]),
                area: schema.number([
                    rules.required()
                ]),
                address: schema.string({}, [
                    rules.required(),
                    rules.maxLength(244)
                ]),
                addressNumber: schema.string({}, [
                    rules.maxLength(50)
                ]),
                complement: schema.string(),
                district: schema.string({}, [
                    rules.required(),
                    rules.maxLength(100)
                ]),
                city: schema.string({}, [
                    rules.required(),
                    rules.maxLength(244)
                ]),
                state: schema.string({}, [
                    rules.required(),
                    rules.minLength(2)
                ]),
                zipCode: schema.string({
                    trim: true
                }, [
                    rules.required(),
                    rules.minLength(9),
                    rules.regex(/^[0-9]{5}-[0-9]{3}$/)
                ])
            });

            const data = await request.validate({
                schema: immobilesSchema
            });

            const resInsert = await Immobile.create(data);

            return response.status(200).json(resInsert);
            
        } catch (e) {
            return response.status(500).json({err: e});
        }
    }

    public async update({request, response}) {
        try{
            const immobilesSchema = schema.create({
                title: schema.string({}, [
                    rules.required(),
                    rules.maxLength(244)
                ]),
                description: schema.string({}, [
                    rules.required(),
                ]),
                amount: schema.number([
                    rules.required(),
                ]),
                area: schema.number([
                    rules.required()
                ]),
                address: schema.string({}, [
                    rules.required(),
                    rules.maxLength(244)
                ]),
                addressNumber: schema.string({}, [
                    rules.maxLength(50)
                ]),
                complement: schema.string(),
                district: schema.string({}, [
                    rules.required(),
                    rules.maxLength(100)
                ]),
                city: schema.string({}, [
                    rules.required(),
                    rules.maxLength(244)
                ]),
                state: schema.string({}, [
                    rules.required(),
                    rules.minLength(2)
                ]),
                zipCode: schema.string({
                    trim: true
                }, [
                    rules.required(),
                    rules.minLength(9),
                    rules.regex(/^[0-9]{5}-[0-9]{3}$/)
                ])
            });

            const immobile = await Immobile.findOrFail(request.param('id'));

            const data = await request.validate({
                schema: immobilesSchema
            });

            return await immobile.merge(data).save();

        } catch (e) {
            return response.status(500).json({err: e});
        }
    }

    public async delete({request, response}) {
        try{
            const immobile = await Immobile.findOrFail(request.param('id'));
            return await immobile.delete();
        } catch (e) {
            return response.status(500).json({err: e});
        }
    }

    public async searchZipCode({request, response}) {
        try {
            const zipCode = request.param('zipCode');
            const address = await axios.get(`https://viacep.com.br/ws/${zipCode}/json/`);
            return response.status(200).json(address.data);
        } catch (e) {
            return response.status(500).json({err: e});
        }
    }
}
