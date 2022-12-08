import {
    Resolver,
    Query,
    Arg,
    Mutation,
    Ctx,
    UseMiddleware,
  } from "type-graphql";
import { Tweet } from "../entities/Tweet";
import { MyContext } from "../types";
import { isAuth } from "../middleware/isAuth";
import { TweetInput } from "./inputs/TweetInput";

@Resolver()
export class TweetResolver {
@Query(() => [Tweet], { nullable: true})
async tweets(): Promise<Tweet[] | null> {
    return Tweet.find();
}

@Query(() => Tweet, { nullable: true })
tweet(@Arg("id") id: number): Promise<Tweet | null> {
    return Tweet.findOne({ where: {id} });
}

@Mutation(() => Tweet)
@UseMiddleware(isAuth)
async createTweet(
    @Arg("input") input: TweetInput,
    @Ctx() { req }: MyContext
): Promise<Tweet> {
    return Tweet.create({
        ...input,
        userId: req.session.userId,
    }).save();
}

@Mutation(() => Boolean)
async deleteTweet(@Arg("id") id: number): Promise<boolean> {
    await Tweet.delete(id);
    return true;
}
}