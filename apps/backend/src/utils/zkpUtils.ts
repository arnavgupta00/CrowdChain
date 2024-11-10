// src/zkpUtils.ts
import * as snarkjs from "snarkjs";
import { join } from "path";
import * as fs from "fs";

interface ProofResult {
  proof: any;
  publicSignals: any;
}

export async function generateProof(
  secret: string,
  hash: string
): Promise<ProofResult> {
  const input = {
    secret: secret,
    hash: hash,
  };

  const wasmPath = join(__dirname, "..", "zkp", "credentialVerifier.wasm");
  const zkeyPath = join(
    __dirname,
    "..",
    "zkp",
    "credentialVerifier_final.zkey"
  );

  // Generate proof using snarkjs
  const { proof, publicSignals } = await snarkjs.groth16.fullProve(
    input,
    wasmPath,
    zkeyPath
  );

  return { proof, publicSignals };
}

export async function verifyProof(
  proof: any,
  publicSignals: any
): Promise<boolean> {
  const vKeyPath = join(__dirname, "..", "zkp", "verification_key.json");
  const vKey = JSON.parse(fs.readFileSync(vKeyPath, "utf8"));

  const res = await snarkjs.groth16.verify(vKey, publicSignals, proof);
  return res;
}
