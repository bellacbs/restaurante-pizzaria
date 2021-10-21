import { BaseDataBase } from "./BaseDataBase";
import { User } from "../model/User";
import { UserRepository } from "../business/UserRepository";

export class UserDatabase extends BaseDataBase implements UserRepository {

  public async createUser(
    id: string,
    email: string,
    name: string,
    password: string,
    role: string
  ): Promise<void> {
    try {
      await this.getConnection()
        .insert({
          id,
          email,
          name,
          password,
          role
        })
        .into(this.tableNames.restaurantUser);
    } catch (error: any) {
      throw new Error(error.sqlMessage || error.message);
    }
  }

  public async getUserByEmail(email: string): Promise<User | null> {
    const result = await this.getConnection()
      .select("*")
      .from(this.tableNames.restaurantUser)
      .where({ email });

    if(result.length === 0){
      return null
    }
    return User.toUserModel(result[0]);
  }

}
