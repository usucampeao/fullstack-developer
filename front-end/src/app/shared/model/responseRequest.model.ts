import { Immobile } from "./immobile.model";
import { Pageable } from "./pageable.model";

export class ResponseRequest {
    meta: Pageable;
    data: Immobile[];
}