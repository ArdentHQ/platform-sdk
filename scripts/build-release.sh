function bundle() {
	cd packages/$1
	pnpm run build:release
	cd ../..
}

pnpm run clean:browser

# 1. Prerequisites
bundle test
bundle helpers
bundle intl
bundle cryptography
bundle sdk
bundle ledger
bundle news
bundle fetch
bundle markets

# 2. Coins
if [[ $1 != '' ]]
then
	bundle $1
else
	bundle ark
	bundle mainsail
fi

# 3. Integration
bundle profiles
