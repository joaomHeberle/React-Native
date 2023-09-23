
import BNCCLPJson from '../../Banco/BNCC banco/LP/1jc9q-f8otp.json';
import BNCCArteJson from '../../Banco/BNCC banco/ARTE/c16ls-vz0l5.json';
import BNCCCieJson from '../../Banco/BNCC banco/Cie/b56jy-85llc.json';
import BNCCERJson from '../../Banco/BNCC banco/E.R/wmdy8-s3n85.json';
import BNCCEFJson from '../../Banco/BNCC banco/ED.F/yqqg1-osp1l.json';
import BNCCGeoJson from '../../Banco/BNCC banco/GEO/xqvro-jdhe2.json';
import BNCCHisJson from '../../Banco/BNCC banco/his/oc1bi-e7uey.json';
import BNCCLIJson from '../../Banco/BNCC banco/Lin. Inglesa/wi4kz-hvz8h.json';
import BNCCMatJson from '../../Banco/BNCC banco/MAT/b1vyt-35n0q.json';

export function converteNomeParaOJson(componente:string) {
    switch (componente) {
        case 'Arte':
            return BNCCArteJson;
            break;
        case "Ciências":
            return BNCCCieJson;
            break;
        case "Ensino Religioso":
            return BNCCERJson;
            break;
        case "Educação Física":
            return BNCCEFJson;
            break;
        case "Geografia":
            return BNCCGeoJson;
            break;
        case "História":
            return BNCCHisJson;
            break;
        case "Língua Inglesa":
            return BNCCLIJson;
            break;
        case "Língua Portuguesa":
            return BNCCLPJson;
            break;
        case "Matemática":
            return BNCCMatJson;
            break;
        default:
            break;
    }
}
export function converteNomeParaMinhaAtividade(componente:string) {
    switch (componente) {
        case "E. Religioso":
            return "Ensino Religioso";
            break;
        case "Ed. Física":
            return "Educação Física";
            break;
        case "L. Inglesa":
            return "Língua Inglesa";
            break;
        case "Português":
            return "Língua Portuguesa";
            break;
     
        default:
            return componente;
            break;
    }
}