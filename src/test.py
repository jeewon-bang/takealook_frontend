# score_dic = {}

# cat = [1,2,3,4]
# score = [10, 30, 60, 20]

# for i in range(len(score)):
#     score_dic[cat[i]] = score[i]
    
# print(score_dic)

# new = sorted(score_dic, key = lambda x: -score_dic[x])
# print(new)

import collections

d = {'a': 5, 'x': 2, 'd': 3, 'c': 1, 'e': 0}
sorted_by_value = sorted(d.items(), key=lambda x: x[1], reverse=False)
print(sorted_by_value)

sorted_dict = collections.OrderedDict(sorted_by_value)
print(dict(sorted_dict))

