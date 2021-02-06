import { BigInt } from "@graphprotocol/graph-ts"
import {
  Issue,
  Redeem,
} from "../generated/TetherToken/TetherToken"
import { Issuance, Redemption } from "../generated/schema"

export function handleIssue(event: Issue): void {
  const entity = new Issuance(event.transaction.hash.toHex());
  entity.amount = event.params.amount;

  entity.save();
}

export function handleRedeem(event: Redeem): void {
  const entity = new Redemption(event.transaction.hash.toHex());
  entity.amount = event.params.amount;

  entity.save();
}