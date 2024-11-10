"use server";

import * as snarkjs from "snarkjs";

const CREDENTIAL_HASH = process.env.CREDENTIAL_HASH!;
const BACKEND_URL = process.env.BACKEND_URL;

const wasmFile = "./zkpFiles/credentialVerifier.wasm";
const finalZkey = "./zkpFiles/credentialVerifier_final.zkey";

export async function generateProof(secret: any) {
  const input = {
    secret: 6328237,
    hash: CREDENTIAL_HASH,
  };

  console.log(input);

  const { proof, publicSignals } = await snarkjs.groth16.fullProve(
    input,
    wasmFile,
    finalZkey
  );
  console.log(proof);

  console.log("sending req")
  const response = await fetch(BACKEND_URL + "/zkp/verify-proof", {
    method: "POST",
    body: JSON.stringify({ proof, publicSignals }),
  });

  console.log(response);

  const data = await response.json();
  return data;
}
