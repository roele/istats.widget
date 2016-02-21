#!/usr/bin/env bash

#
# Execute bash profile
#
if [ -f ~/.bash_profile ]; then
    source ~/.bash_profile
elif [ -f ~/.bash_login ]; then
    source ~/.bash_login
elif [ -f ~/.profile ]; then
    source ~/.profile
fi

#
# Execute iStats command
# 
if [ -n "$(which iStats)" ]; then
    # define command
    command=( "$(which iStats)" )

    # execute
    "${command[@]}"
fi