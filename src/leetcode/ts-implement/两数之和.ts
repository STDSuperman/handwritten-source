function twoSum(nums: number[], target: number): number[] {
    const obj: Record<string, number> = {};
    for (let i = 0; i < nums.length; i++) {
        const tv = target - nums[i];
        if (obj[tv] !== undefined) {
            return [i, obj[tv]];
        } else {
            obj[nums[i]] = i;
        }
    }
    return [];
};

console.log(twoSum([2,7,11,15], 9));