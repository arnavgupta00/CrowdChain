include "circomlib/circuits/poseidon.circom";

template CredentialVerifier() {
    signal input secret;
    signal input hash;

    component poseidonHasher = Poseidon(1);
    poseidonHasher.inputs[0] <== secret;

    hash === poseidonHasher.out;
}

component main = CredentialVerifier();
