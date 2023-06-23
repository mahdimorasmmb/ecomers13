import { Query } from "mongoose";
import { Model } from "mongoose";

class APIFilters {
  query: Query<any[], any, {}>;
  queryStr: URLSearchParams;
  page: number;
  constructor(query: Query<any[], any, {}>, queryStr: URLSearchParams) {
    this.query = query;
    this.queryStr = queryStr;
    this.page = Number(queryStr.get("page"));
    queryStr.delete("page");
  }

  search() {
    let keyword: {
      [key: string]: any;
    } = {};
    let prop;
    if (this.queryStr) {
      for (const [key, value] of this.queryStr.entries()) {
        if (!key.match(/\b(gt|gte|lt|lte)/)) {
          Object.assign(keyword, {
            [key]: {
              $regex: value,
              $options: "i",
            },
          });
        } else {
          prop = key.split("[")[0];
          const matchResult = key?.match(/\[(.*)\]/);
          const operator = matchResult ? matchResult[1] : null;
          Object.assign(keyword, {
            [prop]: {
              ...(keyword[key] || {}),
              [`$${operator}`]: value,
            },
          });
        }
      }
    }
    

    this.query = this.query.find({ ...keyword }) as Query<any[], any, {}>;
    return this;
  }

  pagination(resPerPage: any) {
    const currentPage = this.page || 1;
    const skip = resPerPage * (currentPage - 1);

    this.query = this.query.limit(resPerPage).skip(skip);
    return this;
  }
}

export default APIFilters;
