#!/bin/bash
OPTIND=1
minargs=1
keyfile="key"
key=$(cat $keyfile)

function msg {
    case "$1" in
        0) sev="Debug";;
        1) sev="Info";;
        2) sev="Error";;
        3) sev="Critical";;
    esac
    if [ "$sev" = "Debug" ] && $verbose || [ "$sev" != "Debug" ]; then
        printf "$(date "$dateformat"): [""$sev""] $(eval echo "$2")\n"
    fi
    case "$1" in
        2)  over 1
            show_help 1
            ;;
        3)  over 2;;
    esac
}

function show_help {
    usage="Usage: $0 -[vh] <list|clean|[url]> [url]\n"
    if [ "$1" = "0" ]; then
        msg "0" "Showing long help"
        printf "webdiff - track changes beween web pages across time\n\n"
        printf "$usage"
        printf "Examples:\n"
        printf "\t$0 google.com - Download a webpage and if applicable, compare to the previously downloaded one\n"
        printf "\n\t$0 list -  List all previously downloaded sites\n"
        printf "\t$0 list gith - List previously downloaded version of all sites that contain the character sequence \"gith\"\n"
        printf "\n\t$0 clean -  Delete all previously downloaded sites\n"
        printf "\t$0 clean google - Delete all downloaded versions of all sites that contain the word \"google\"\n"
    else
        msg "0" "Showing short help"
        printf "$usage"
    fi
    msg "0" "Help printing complete"
}

function interface {
    curl --request GET --url "https://us3.api.mailchimp.com/3.0/$1" --user "anystring:$key"
}

function over {
    msg "0" "Exiting with code $1"
    exit "$1"
}

function help {
    show_help 0
    over 0
}

verbose=false
while getopts "vdh?:" opt; do
    case "$opt" in
        h|\?)
            show_help 0
            shift $((OPTIND-1))
            [ "$1" = "--" ] && shift
            over 0
            ;;
        v|d)
            verbose=true
            msg "0" "Running in verbose mode"
            shift $((OPTIND-1))
            [ "$1" = "--" ] && shift
            ;;
    esac
done

#if [ $# -lt $minargs ]; then
#    msg "2" "Argument count must be $minargs, you provided $#"
#fi

curdate="$(date +""%s"")"

msg "0" "Running function as command: $@"
eval "$@"

if [ "$?" = 0 ]; then
    msg "0" "Running \"$1\" was successful"
else
    msg "2" "Running \"$1\" was unsuccessful, please check your arguments!"
fi
