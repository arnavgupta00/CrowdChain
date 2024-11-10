module MyModule::Crowdfunding {

    use aptos_framework::signer;
    use std::vector;

    struct Campaign has store, key {
        creator: address,
        goal: u64,
        funds_raised: u64,
        is_active: bool,
    }

    public fun create_campaign(creator: &signer, goal: u64) {
        let campaign = Campaign {
            creator: signer::address_of(creator),
            goal,
            funds_raised: 0,
            is_active: true,
        };
        move_to(creator, campaign);
    }

    public fun contribute(contributor: &signer, creator_address: address) acquires Campaign {
        let campaign = borrow_global_mut<Campaign>(creator_address);
        assert!(campaign.is_active, 1);
        let contribution_amount: u64 = 100;
        campaign.funds_raised = campaign.funds_raised + contribution_amount;
    }

    public fun close_campaign(creator: &signer) acquires Campaign {
        let campaign = borrow_global_mut<Campaign>(signer::address_of(creator));
        assert!(campaign.creator == signer::address_of(creator), 2);
        campaign.is_active = false;
    }
}
