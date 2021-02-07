import { BigInt } from "@graphprotocol/graph-ts"
import {
  Issue,
  Redeem,
} from "../generated/TetherToken/TetherToken"
import { Issuance, TotalIssuance, Redemption, TotalRedemption } from "../generated/schema"

export function handleIssue(event: Issue): void {
  let issuanceEntity = new Issuance(event.transaction.hash.toHex());
  issuanceEntity.amount = event.params.amount;
  issuanceEntity.save();

  let totalIssuanceEntity = TotalIssuance.load('1');
  if (totalIssuanceEntity == null) {
    totalIssuanceEntity = new TotalIssuance('1');
    totalIssuanceEntity.amount = event.params.amount;
  } else {
    totalIssuanceEntity.amount = totalIssuanceEntity.amount.plus(event.params.amount);
  }
  totalIssuanceEntity.save();
}

export function handleRedeem(event: Redeem): void {
  let redemptionEntity = new Redemption(event.transaction.hash.toHex());
  redemptionEntity.amount = event.params.amount;
  redemptionEntity.save();

  let totalRedemptionEntity = TotalRedemption.load('1');
  if (totalRedemptionEntity == null) {
    totalRedemptionEntity = new TotalRedemption('1');
    totalRedemptionEntity.amount = event.params.amount;
  } else {
    totalRedemptionEntity.amount = totalRedemptionEntity.amount.plus(event.params.amount);
  }
  totalRedemptionEntity.save();
}