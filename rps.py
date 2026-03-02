import random
choices=["rock","paper","scissors"]
round_no=1
user_score,comp_score=0,0

while (user_score+comp_score)<3:
    print("ROUND ",round_no)
    user_choice=input("Enter choice (Rock/Paper/Scissors): ")
    comp_index=random.randint(0,2)

    if user_choice.lower() not in choices:
        print("Invalid!")
    else:
        print()
        user_index=choices.index(user_choice.lower())
        result=(user_index-comp_index)%3
        print("User:     ",user_choice,"\nComputer: ",choices[comp_index])
        print()
        if result==0:
            print("It's a Tie!")
        elif result==1:
            print("User Win!")
            user_score+=1
        else:
            print("Computer Win!")
            comp_score+=1
        round+=1
        print()
print("User Score: ",user_score)
print("Computer Score: ",comp_score)
if(user_score>comp_score):
    print("User Won!")
else:
    print("Computer Won!")

